import React from 'react';
import { useParams } from 'react-router-dom';

const DestinationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-responsive mb-8">
            Destination Details
          </h1>
          
          {/* Destination component will be implemented here */}
          <div className="card">
            <p className="text-center text-gray-500">
              Destination component for ID: {id} coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;





