import React, { useState, useEffect } from 'react';
import { useDestinations } from '../hooks/useDestinations';
import DestinationCard from '../components/Destination/DestinationCard';
import { Destination } from '../types';

const DestinationsPage: React.FC = () => {
  const { destinations, loading, error, loadDestinations } = useDestinations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedSustainability, setSelectedSustainability] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);

  // Fetch all destinations on component mount
  useEffect(() => {
    loadDestinations();
  }, [loadDestinations]);

  // Filter destinations based on search and filters
  useEffect(() => {
    let filtered = destinations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.trip_style_tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        dest.interest_tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Country filter
    if (selectedCountry) {
      filtered = filtered.filter(dest => dest.country === selectedCountry);
    }

    // Budget filter
    if (selectedBudget) {
      filtered = filtered.filter(dest => dest.budget_category === selectedBudget);
    }

    // Sustainability filter
    if (selectedSustainability) {
      filtered = filtered.filter(dest => dest.sustainability === selectedSustainability);
    }

    setFilteredDestinations(filtered);
  }, [destinations, searchTerm, selectedCountry, selectedBudget, selectedSustainability]);

  // Get unique countries for filter dropdown
  const uniqueCountries = Array.from(new Set(destinations.map(dest => dest.country))).sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-forest mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading destinations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 text-lg mb-4">Error loading destinations</div>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-deep-forest mb-4">
            Discover Destinations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of unique destinations around the world. 
            Find your next adventure with authentic experiences and local insights.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Destinations
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, country, or interests..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-forest focus:border-transparent"
              />
            </div>

            {/* Country Filter */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-forest focus:border-transparent"
              >
                <option value="">All Countries</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Budget Filter */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <select
                id="budget"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-forest focus:border-transparent"
              >
                <option value="">All Budgets</option>
                <option value="Low">Low Budget</option>
                <option value="Medium">Medium Budget</option>
                <option value="High">High Budget</option>
              </select>
            </div>

            {/* Sustainability Filter */}
            <div>
              <label htmlFor="sustainability" className="block text-sm font-medium text-gray-700 mb-2">
                Sustainability
              </label>
              <select
                id="sustainability"
                value={selectedSustainability}
                onChange={(e) => setSelectedSustainability(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-forest focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="High">High Sustainability</option>
                <option value="Medium">Medium Sustainability</option>
                <option value="Low">Low Sustainability</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedCountry || selectedBudget || selectedSustainability) && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCountry('');
                  setSelectedBudget('');
                  setSelectedSustainability('');
                }}
                className="text-sm text-deep-forest hover:text-deep-forest-dark underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDestinations.length} of {destinations.length} destinations
          </p>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more destinations.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCountry('');
                setSelectedBudget('');
                setSelectedSustainability('');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;
