import React from 'react';
import { User } from '../../types';
import { calculateReputationTier } from '../../utils/reputationTier';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const reputationTier = calculateReputationTier(user.reputation);

  const getReputationIcon = (tier: string) => {
    switch (tier) {
      case 'New Traveller': return '🆕';
      case 'Active Traveller': return '🚶';
      case 'Local': return '🏠';
      case 'Local Expert': return '⭐';
      default: return '🆕';
    }
  };

  const getReputationColor = (tier: string) => {
    switch (tier) {
      case 'New Traveller': return 'bg-gray-100 text-gray-800';
      case 'Active Traveller': return 'bg-blue-100 text-blue-800';
      case 'Local': return 'bg-green-100 text-green-800';
      case 'Local Expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Avatar */}
        <div className="w-24 h-24 bg-sandstone-light rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-3xl font-bold text-sandstone-dark">
            {user.username?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h1 className="text-3xl font-bold text-deep-forest mb-2 sm:mb-0">
              {user.username}
            </h1>
            <div className="flex items-center space-x-3">
              {/* Credits */}
              <div className="text-center">
                <div className="text-2xl font-bold text-sandstone">
                  {user.credits}
                </div>
                <div className="text-xs text-gray-500">Credits</div>
              </div>
              
              {/* Reputation Badge */}
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getReputationColor(reputationTier)}`}>
                <span>{getReputationIcon(reputationTier)}</span>
                <span>{reputationTier}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500">{user.country}</p>
            <p className="text-sm text-gray-500">
              Member since {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Interests */}
          {user.interests && user.interests.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;






