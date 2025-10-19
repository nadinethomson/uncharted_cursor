import React, { useState } from 'react';
import { Post } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import { calculateReputationTier } from '../../utils/reputationTier';

interface PostCardProps {
  post: Post;
  onPostUpdated: () => void;
  onPostDeleted: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onPostUpdated,
  onPostDeleted
}) => {
  const { user } = useAuth();
  const { editPost, removePost, loading } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    content: post.content,
    type: post.type,
    image: null as File | null
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isOwner = user && post.user_id === user.id;

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'tip': return '💡';
      case 'review': return '⭐';
      case 'experience': return '🎯';
      default: return '📝';
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'tip': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'experience': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReputationTierInfo = (reputation: number) => {
    const tier = calculateReputationTier(reputation);
    const tierInfo = {
      'New Traveller': { icon: '🌱', color: 'text-green-600' },
      'Active Traveller': { icon: '🚶', color: 'text-blue-600' },
      'Local': { icon: '🏠', color: 'text-purple-600' },
      'Local Expert': { icon: '⭐', color: 'text-gold-600' }
    };
    return tierInfo[tier] || tierInfo['New Traveller'];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = async () => {
    if (!editData.content.trim()) return;

    const result = await editPost(post.id, {
      content: editData.content.trim(),
      type: editData.type,
      imageFile: editData.image || undefined
    });

    if (result) {
      setIsEditing(false);
      setEditData({
        content: post.content,
        type: post.type,
        image: null
      });
      onPostUpdated();
    }
  };

  const handleDelete = async () => {
    const success = await removePost(post.id);
    if (success) {
      onPostDeleted();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return;
      }
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        return;
      }
    }
    setEditData(prev => ({ ...prev, image: file }));
  };

  const reputationTier = getReputationTierInfo(post.user?.reputation || 0);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">
              {post.user?.username || 'Anonymous'}
            </span>
            <span className={`text-sm ${reputationTier.color} flex items-center space-x-1`}>
              <span>{reputationTier.icon}</span>
              <span>{calculateReputationTier(post.user?.reputation || 0)}</span>
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
            {getPostTypeIcon(post.type)} {post.type}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {formatDate(post.created_at)}
          </span>
          
          {/* Owner Actions */}
          {isOwner && (
            <div className="flex items-center space-x-1">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-sm text-red-600 hover:text-red-800"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEdit}
                    className="text-sm text-green-600 hover:text-green-800"
                    disabled={loading || !editData.content.trim()}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditData({
                        content: post.content,
                        type: post.type,
                        image: null
                      });
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post Type
            </label>
            <select
              value={editData.type}
              onChange={(e) => setEditData(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sandstone focus:border-transparent"
            >
              <option value="tip">💡 Tip</option>
              <option value="review">⭐ Review</option>
              <option value="experience">🎯 Experience</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={editData.content}
              onChange={(e) => setEditData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sandstone focus:border-transparent resize-none"
              rows={3}
              maxLength={500}
              placeholder="Share your travel wisdom..."
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {editData.content.length}/500 characters
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Update Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sandstone focus:border-transparent"
            />
            <div className="text-sm text-gray-500 mt-1">
              Max 2MB, JPG or PNG
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 mb-3">{post.content}</p>
          
          {/* Post Image */}
          {post.image_url && (
            <div className="mb-3">
              <img
                src={post.image_url}
                alt=""
                className="max-w-full h-auto rounded-lg shadow-sm"
                style={{ maxHeight: '300px' }}
              />
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Post
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;




