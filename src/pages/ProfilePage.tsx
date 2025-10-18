import React from 'react';
import { useAuth } from '../hooks/useAuth';

// Import profile components
import ProfileHeader from '../components/Profile/ProfileHeader';
import AccountSettings from '../components/Profile/AccountSettings';
import SavedDestinations from '../components/Profile/SavedDestinations';
import VisitedDestinations from '../components/Profile/VisitedDestinations';
import UserPosts from '../components/Profile/UserPosts';

const ProfilePage: React.FC = () => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-deep-forest mb-4">
                Access Denied
              </h2>
              <p className="text-gray-600">
                Please log in to view your profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Profile Header */}
          <ProfileHeader user={user} />

          {/* Account Settings */}
          <AccountSettings user={user} />

          {/* Saved and Visited Destinations */}
          <div className="grid gap-6 lg:grid-cols-2">
            <SavedDestinations userId={user.id} />
            <VisitedDestinations userId={user.id} />
          </div>

          {/* User Posts */}
          <UserPosts userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;






