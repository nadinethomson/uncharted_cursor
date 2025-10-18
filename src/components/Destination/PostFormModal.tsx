import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCredits } from '../../hooks/useCredits';
import { createPost } from '../../services/postService';
import { Post } from '../../types';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/constants';

interface PostFormModalProps {
  destinationId: string;
  destinationName: string;
  onClose: () => void;
  onSuccess: (post: Post) => void;
}

const PostFormModal: React.FC<PostFormModalProps> = ({
  destinationId,
  destinationName,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const { canPerformAction } = useCredits();
  const [formData, setFormData] = useState({
    type: 'tip' as 'tip' | 'review' | 'experience',
    content: '',
    image: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG)');
        return;
      }
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError('Image must be smaller than 2MB');
        return;
      }
    }
    setFormData(prev => ({ ...prev, image: file }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const newPost = await createPost({
        userId: user.id,
        destinationId,
        type: formData.type,
        content: formData.content.trim(),
        imageFile: formData.image || undefined
      });

      onSuccess(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const getPostTypeInfo = (type: string) => {
    switch (type) {
      case 'tip': return { icon: '💡', description: 'Share a helpful tip', credits: '+5 credits' };
      case 'review': return { icon: '⭐', description: 'Write a review', credits: '+5 credits' };
      case 'experience': return { icon: '🎯', description: 'Share an experience', credits: '+10 credits' };
      default: return { icon: '📝', description: 'Share content', credits: '+5 credits' };
    }
  };

  const isFormValid = formData.content.trim().length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-deep-forest">
              Share Your Experience
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4 p-3 bg-sandstone-light rounded-lg">
            <p className="text-sm text-sandstone-dark">
              Sharing about <strong>{destinationName}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Post Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                What are you sharing? *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sandstone focus:border-transparent"
                required
              >
                <option value="tip">💡 Tip - Share a helpful tip</option>
                <option value="review">⭐ Review - Write a review</option>
                <option value="experience">🎯 Experience - Share an experience</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {getPostTypeInfo(formData.type).credits}
              </p>
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Your {formData.type} *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder={`Share your ${formData.type} about ${destinationName}...`}
                rows={4}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sandstone focus:border-transparent resize-none"
                required
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.content.length}/500 characters
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image (Optional)
              </label>
              <input
                type="file"
                id="image"
                accept="image/jpeg,image/png"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sandstone focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                JPG or PNG, max 2MB
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Posting...' : `Share ${getPostTypeInfo(formData.type).credits}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostFormModal;




