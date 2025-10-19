import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserPosts } from '../../services/postService';
import { Post } from '../../types';
import { calculateReputationTier } from '../../utils/reputationTier';

interface UserPostsProps {
  userId: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    loadUserPosts();
  }, [userId]);

  const loadUserPosts = async (page: number = 0) => {
    try {
      setLoading(true);
      setError(null);

      const userPosts = await getUserPosts(
        userId, 
        POSTS_PER_PAGE, 
        page * POSTS_PER_PAGE
      );

      if (page === 0) {
        setPosts(userPosts);
      } else {
        setPosts(prev => [...prev, ...userPosts]);
      }

      setHasMore(userPosts.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error('Error loading user posts:', error);
      setError('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadUserPosts(nextPage);
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && posts.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-deep-forest mb-6">
          My Posts
        </h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
                  <div className="h-3 bg-gray-300 rounded mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-deep-forest mb-6">
          My Posts
        </h2>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => loadUserPosts(0)}
            className="btn-outline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-deep-forest mb-6">
        My Posts
      </h2>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-500 mb-4">
            Start sharing your travel experiences, tips, and reviews!
          </p>
          <Link to="/quiz" className="btn-primary">
            Explore Destinations
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  {/* User Avatar */}
                  <div className="w-10 h-10 bg-sandstone-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-sandstone-dark">
                      {post.user?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Post Header */}
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">
                        {post.user?.username || 'Anonymous'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
                        {getPostTypeIcon(post.type)} {post.type}
                      </span>
                      {post.user?.reputation !== undefined && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {calculateReputationTier(post.user.reputation)}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatDate(post.created_at)}
                      </span>
                    </div>

                    {/* Destination Link */}
                    {post.destination && (
                      <div className="mb-2">
                        <Link
                          to={`/destination/${post.destination.id}`}
                          className="text-sm text-sandstone hover:text-sandstone-dark font-medium"
                        >
                          📍 {post.destination.name}, {post.destination.country}
                        </Link>
                      </div>
                    )}

                    {/* Post Content */}
                    <p className="text-gray-700 mb-3">
                      {post.content}
                    </p>

                    {/* Post Image */}
                    {post.image_url && (
                      <div className="mb-3">
                        <img
                          src={post.image_url}
                          alt="no image"
                          className="max-w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Post Footer */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👍 Helpful</span>
                      <span>💬 Reply</span>
                      <span>📤 Share</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserPosts;





