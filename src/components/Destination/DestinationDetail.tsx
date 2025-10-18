import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useAuth } from '../../hooks/useAuth';
import { Destination } from '../../types';
import { getDestinationById } from '../../services/destinationService';
import { getSavedVisitedDestinations } from '../../services/savedVisitedService';
import { saveDestination, visitDestination } from '../../services/savedVisitedService';
import { getErrorMessage, ERROR_MESSAGES } from '../../utils/constants';

// Import sub-components
import DestinationHero from './DestinationHero';
import KeyAttractions from './KeyAttractions';
import TravelInfo from './TravelInfo';
import CommunityTips from './CommunityTips';
import AskALocalSection from './AskALocalSection';
import AddExperienceModal from './AddExperienceModal';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn, user } = useAuth();
  
  const [destination, setDestination] = useState<Destination | null>(null);
  const [savedDestinations, setSavedDestinations] = useState<string[]>([]);
  const [visitedDestinations, setVisitedDestinations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showAddExperience, setShowAddExperience] = useState(false);

  useEffect(() => {
    if (id) {
      loadDestinationData();
    }
  }, [id]);

  const loadDestinationData = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    try {
      // Load destination details
      const dest = await getDestinationById(id);
      setDestination(dest);



      // Load saved/visited destinations if user is logged in
      if (isLoggedIn && user) {
        const savedVisited = await getSavedVisitedDestinations(user.id);
        setSavedDestinations(savedVisited.saved.map(d => d.destination_id));
        setVisitedDestinations(savedVisited.visited.map(d => d.destination_id));
      }

    } catch (error) {
      console.error('Error loading destination data:', error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDestination = async () => {
    if (!destination || !user) return;

    try {
      if (savedDestinations.includes(destination.id)) {
        // Remove from saved
        await saveDestination(user.id, destination.id, false);
        setSavedDestinations(prev => prev.filter(id => id !== destination.id));
      } else {
        // Add to saved
        await saveDestination(user.id, destination.id, true);
        setSavedDestinations(prev => [...prev, destination.id]);
      }
    } catch (error) {
      console.error('Error saving destination:', error);
    }
  };

  const handleVisitDestination = async () => {
    if (!destination || !user) return;

    try {
      if (visitedDestinations.includes(destination.id)) {
        // Remove from visited
        await visitDestination(user.id, destination.id, false);
        setVisitedDestinations(prev => prev.filter(id => id !== destination.id));
      } else {
        // Add to visited
        await visitDestination(user.id, destination.id, true);
        setVisitedDestinations(prev => [...prev, destination.id]);
      }
    } catch (error) {
      console.error('Error marking destination as visited:', error);
    }
  };


  const handleExperienceAdded = () => {
    // Reload destination to get updated attractions
    if (id) {
      getDestinationById(id).then(setDestination);
    }
    setShowAddExperience(false);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">🗺️</div>
              <h2 className="text-2xl font-bold text-deep-forest mb-4">
                Destination Not Found
              </h2>
              <p className="text-gray-600 mb-8">
                {error || ERROR_MESSAGES.DESTINATION_NOT_FOUND}
              </p>
              <a href="/" className="btn-primary">
                Back to Home
              </a>
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
          
          {/* Hero Section */}
          <DestinationHero 
            destination={destination}
            isSaved={savedDestinations.includes(destination.id)}
            isVisited={visitedDestinations.includes(destination.id)}
            onSave={handleSaveDestination}
            onVisit={handleVisitDestination}
            isLoggedIn={isLoggedIn}
          />

          {/* Key Attractions */}
          <KeyAttractions 
            destination={destination}
            onAddExperience={() => setShowAddExperience(true)}
            isLoggedIn={isLoggedIn}
          />

          {/* Travel Info */}
          <TravelInfo destination={destination} />

          {/* Community Tips */}
          <CommunityTips 
            destinationId={destination.id}
            destinationName={destination.name}
          />

          {/* Ask a Local */}
          <AskALocalSection 
            destinationId={destination.id}
            destinationName={destination.name}
          />

        </div>
      </div>

      {/* Modals */}
      {showAddExperience && (
        <AddExperienceModal
          destinationId={destination.id}
          onClose={() => setShowAddExperience(false)}
          onSuccess={handleExperienceAdded}
        />
      )}

    </div>
  );
};

export default DestinationDetail;
