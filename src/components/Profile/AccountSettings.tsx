import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { resetPassword } from '../../services/authService';
import { ERROR_MESSAGES } from '../../utils/constants';

interface AccountSettingsProps {
  user: any; // User type
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async () => {
    if (!user?.email) return;

    setLoading(true);
    setError(null);

    try {
      const result = await resetPassword(user.email);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.error || ERROR_MESSAGES.GENERIC_ERROR);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setError(ERROR_MESSAGES.GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-deep-forest mb-6">
        Account Settings
      </h2>
      
      <div className="space-y-6">
        {/* Password Reset Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Password
              </h3>
              <p className="text-sm text-gray-600">
                Reset your password by email
              </p>
            </div>
            <button
              onClick={handlePasswordReset}
              disabled={loading}
              className="btn-outline text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Reset Password'}
            </button>
          </div>
          
          {/* Success Message */}
          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">
                Password reset link sent to {user.email}
              </p>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Profile Information
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <p className="text-gray-900">{user.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <p className="text-gray-900">{user.country}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Member Since
              </label>
              <p className="text-gray-900">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Coming Soon Notice */}
        <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-600">ℹ️</div>
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">
                Profile Editing Coming Soon
              </h4>
              <p className="text-sm text-yellow-700">
                Profile editing features are currently being developed. For now, you can reset your password and view your profile information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;




