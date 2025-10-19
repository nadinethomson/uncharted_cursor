import React, { useState } from 'react';
import { Post } from '../../types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onPostUpdated: () => void;
  onPostDeleted: () => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  onPostUpdated,
  onPostDeleted
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedPosts = showAll ? posts : posts.slice(0, 3);

  if (posts.length === 0) {
    return (
      <div className="card p-6 text-center">
        <div className="text-4xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Posts Yet</h3>
        <p className="text-gray-600">
          Be the first to share a tip, review, or experience about this destination!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onPostUpdated={onPostUpdated}
          onPostDeleted={onPostDeleted}
        />
      ))}
      
      {posts.length > 3 && (
        <div className="text-center pt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-outline"
          >
            {showAll ? 'Show Less' : `Show All ${posts.length} Posts`}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;




