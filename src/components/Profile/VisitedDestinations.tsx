import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVisitedDestinations } from '../../services/savedVisitedService';
import { SavedVisited } from '../../types';

interface VisitedDestinationsProps {
  userId: string;
}

const VisitedDestinations: React.FC<VisitedDestinationsProps> = ({ userId }) => {
  const [visitedDestinations, setVisitedDestinations] = useState<SavedVisited[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const DESTINATIONS_PER_PAGE = 12;

  useEffect(() => {
    loadVisitedDestinations();
  }, [userId]);

  const loadVisitedDestinations = async (page: number = 0) => {
    try {
      setLoading(true);
      setError(null);

      const destinations = await getVisitedDestinations(
        userId, 
        DESTINATIONS_PER_PAGE, 
        page * DESTINATIONS_PER_PAGE
      );

      if (page === 0) {
        setVisitedDestinations(destinations);
      } else {
        setVisitedDestinations(prev => [...prev, ...destinations]);
      }

      setHasMore(destinations.length === DESTINATIONS_PER_PAGE);
    } catch (error) {
      console.error('Error loading visited destinations:', error);
      setError('Failed to load visited destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadVisitedDestinations(nextPage);
  };

  if (loading && visitedDestinations.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-deep-forest mb-6">
          Visited Destinations
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-32 bg-gray-300 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
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
          Visited Destinations
        </h2>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => loadVisitedDestinations(0)}
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
        Visited Destinations
      </h2>

      {visitedDestinations.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No visited destinations yet
          </h3>
          <p className="text-gray-500 mb-4">
            Mark destinations as visited after you've been there!
          </p>
          <Link to="/quiz" className="btn-primary">
            Start Exploring
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visitedDestinations.map((visitedDest) => {
              const destination = visitedDest.destination;
              if (!destination) return null;

              return (
                <Link
                  key={visitedDest.id}
                  to={`/destination/${destination.id}`}
                  className="group block"
                >
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow relative">
                    {/* Visited Badge */}
                    <div className="absolute top-2 right-2 z-10">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <span>✅</span>
                        <span>Visited</span>
                      </div>
                    </div>

                    {/* Destination Image */}
                    <div className="h-32 bg-gradient-to-br from-sandstone to-sandstone-light flex items-center justify-center">
                      {destination.image_url ? (
                        <img
                          src={destination.image_url}
                          alt={destination.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl">🏛️</span>
                      )}
                    </div>

                    {/* Destination Info */}
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-sandstone transition-colors mb-1">
                        {destination.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {destination.country}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {destination.overview}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Visited on {new Date(visitedDest.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
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

export default VisitedDestinations;




