import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCredits } from '../../hooks/useCredits';
import { usePosts } from '../../hooks/usePosts';
import { CreatePostData } from '../../types';
import { getErrorMessage, ERROR_MESSAGES } from '../../utils/constants';

interface PostFormModalProps {
  destinationId: string;
  destinationName: string;
  onClose: () => void;
  onSuccess: () => void;
}

const PostFormModal: React.FC<PostFormModalProps> = ({
  destinationId,
  destinationName,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const { canPerformAction } = useCredits();
  const { createNewPost, loading, error } = usePosts();
  
  const [formData, setFormData] = useState({
    type: 'tip' as 'tip' | 'review' | 'experience',
    content: '',
    image: null as File | null
  });
  
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setValidationError(ERROR_MESSAGES.INVALID_FILE_TYPE);
        return;
      }
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        setValidationError(ERROR_MESSAGES.FILE_TOO_LARGE);
        return;
      }
    }
    setFormData(prev => ({ ...prev, image: file }));
    setValidationError(null); // Clear validation error on successful file selection
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !formData.content.trim()) {
      return;
    }

    const postData: CreatePostData = {
      userId: user.id,
      destinationId,
      type: formData.type,
      content: formData.content.trim(),
      imageFile: formData.image || undefined
    };

    const result = await createNewPost(postData);
    if (result) {
      onSuccess();
      onClose();
    }
  };

  const canPost = canPerformAction('post');

  const getPostTypeInfo = (type: string) => {
    switch (type) {
      case 'tip':
        return { icon: '💡', description: 'Share a helpful travel tip', credits: '+5 credits' };
      case 'review':
        return { icon: '⭐', description: 'Write a destination review', credits: '+5 credits' };
      case 'experience':
        return { icon: '🎯', description: 'Share a unique experience', credits: '+10 credits' };
      default:
        return { icon: '📝', description: 'Share your thoughts', credits: '+5 credits' };
    }
  };

  const typeInfo = getPostTypeInfo(formData.type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="post-modal-title">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto sm:max-h-[90vh]">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 id="post-modal-title" className="text-2xl font-bold text-deep-forest">
              Share Your Experience
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Share your travel wisdom about {destinationName} and help fellow travelers discover amazing experiences.
          </p>

          {!canPost && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-6">
              <div className="flex items-center">
                <span className="text-amber-600 mr-2">⚠️</span>
                <span>
                  You need to be logged in to share posts.
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              <span className="block">{error}</span>
            </div>
          )}

          {validationError && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              <span className="block">{validationError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="post-modal-title">
            {/* Post Type Selection */}
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-3">
                What would you like to share?
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['tip', 'review', 'experience'] as const).map((type) => {
                  const info = getPostTypeInfo(type);
                  return (
                    <label
                      key={type}
                      className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                        formData.type === type
                          ? 'border-sandstone bg-sandstone-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={formData.type === type}
                        onChange={handleInputChange}
                        className="sr-only"
                        aria-describedby={`${type}-description`}
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2" aria-hidden="true">{info.icon}</div>
                        <div className="font-medium text-gray-900 capitalize">{type}</div>
                        <div id={`${type}-description`} className="text-sm text-gray-600">{info.description}</div>
                        <div className="text-xs text-sandstone font-medium mt-1">{info.credits}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Your {formData.type} about {destinationName}
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder={`Share your ${formData.type} about this destination...`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sandstone focus:border-transparent resize-none"
                rows={4}
                maxLength={500}
                required
                aria-describedby="content-help"
              />
              <div className="flex justify-between items-center mt-1">
                <div id="content-help" className="text-sm text-gray-500">
                  {formData.content.length}/500 characters
                </div>
                <div className="text-sm text-sandstone font-medium">
                  {typeInfo.credits}
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Add a photo (optional)
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sandstone focus:border-transparent"
                aria-describedby="image-help"
              />
              <div id="image-help" className="text-sm text-gray-500 mt-1">
                Max 2MB, JPG or PNG format
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="no image to see here"
                    className="max-w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.content.trim() || !canPost}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sharing...' : `Share ${formData.type}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostFormModal;

