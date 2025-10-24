import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AuthPromptProps {
  title: string;
  description: string;
  action: string;
  children?: React.ReactNode;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ 
  title, 
  description, 
  action, 
  children 
}) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="bg-sandstone-light border border-sandstone-dark rounded-xl p-6 text-center">
      <div className="text-4xl mb-4">🔒</div>
      <h3 className="text-xl font-semibold text-deep-forest mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/signup" className="btn-primary">
          Sign Up to {action}
        </Link>
        <Link to="/login" className="btn-outline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default AuthPrompt;









