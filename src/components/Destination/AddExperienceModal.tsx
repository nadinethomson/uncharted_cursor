import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCredits } from '../../hooks/useCredits';
import { addExperienceToDestination } from '../../services/destinationService';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/constants';

interface AddExperienceModalProps {
  destinationId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
  destinationId,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const { canPerformAction } = useCredits();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      await addExperienceToDestination({
        destinationId,
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: formData.image || undefined
      });

      onSuccess();
    } catch (error) {
      console.error('Error adding experience:', error);
      setError(error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.description.trim();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-deep-forest">
              Add Experience
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Experience Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Hidden Waterfall Trail"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sandstone focus:border-transparent"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe this experience in detail..."
                rows={4}
                maxLength={300}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sandstone focus:border-transparent resize-none"
                required
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.description.length}/300 characters
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
                {loading ? 'Adding...' : 'Add Experience (+10 credits)'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExperienceModal;






