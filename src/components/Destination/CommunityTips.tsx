import React, { useState, useEffect } from 'react';
import { Post } from '../../types';
import { usePosts } from '../../hooks/usePosts';
import PostList from '../Posts/PostList';
import PostFormModal from '../Posts/PostFormModal';

interface CommunityTipsProps {
  destinationId: string;
  destinationName: string;
}

const CommunityTips: React.FC<CommunityTipsProps> = ({
  destinationId,
  destinationName
}) => {
  const { fetchPosts, loading, error } = usePosts();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [destinationId]);

  const loadPosts = async () => {
    const fetchedPosts = await fetchPosts(destinationId);
    setPosts(fetchedPosts);
  };

  const handlePostUpdated = () => {
    loadPosts();
  };

  const handlePostDeleted = () => {
    loadPosts();
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-deep-forest">
          Community Tips
        </h2>
        <button
          onClick={() => setShowPostForm(true)}
          className="btn-outline text-sm px-4 py-2"
        >
          Share a Tip
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
          <span className="block">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading community tips...</p>
        </div>
      ) : (
        <PostList
          posts={posts}
          onPostUpdated={handlePostUpdated}
          onPostDeleted={handlePostDeleted}
        />
      )}

      {/* Post Form Modal */}
      {showPostForm && (
        <PostFormModal
          destinationId={destinationId}
          destinationName={destinationName}
          onClose={() => setShowPostForm(false)}
          onSuccess={handlePostUpdated}
        />
      )}
    </div>
  );
};

export default CommunityTips;