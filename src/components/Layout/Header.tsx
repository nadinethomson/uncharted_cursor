import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationPanel from './NotificationPanel';

const Header: React.FC = () => {
  const { isLoggedIn, user, signout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-sandstone-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            aria-label="Uncharted - Go to homepage"
          >
            <div className="text-3xl group-hover:scale-110 transition-transform duration-200" aria-hidden="true">🧭</div>
            <span className="text-2xl font-bold text-deep-forest group-hover:text-deep-forest-dark transition-colors duration-200">
              Uncharted
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className={`nav-link ${isActive('/destinations') ? 'nav-link-active' : ''}`}
              aria-current={isActive('/destinations') ? 'page' : undefined}
            >
              Find Destinations
            </Link>
            {isLoggedIn && (
              <Link 
                to="/profile" 
                className={`nav-link ${isActive('/profile') ? 'nav-link-active' : ''}`}
                aria-current={isActive('/profile') ? 'page' : undefined}
              >
                Profile
              </Link>
            )}
          </nav>

              {/* User Actions */}
              <div className="flex items-center space-x-3">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    {/* Credits Display */}
                    <div className="hidden sm:flex items-center space-x-2 bg-gold-accent bg-opacity-20 px-3 py-1 rounded-full" role="status" aria-label={`You have ${user?.credits || 0} travel credits`}>
                      <span className="text-sm font-medium text-deep-forest">
                        {user?.credits || 0} credits
                      </span>
                    </div>
                    
                    {/* Notifications Bell */}
                    <button
                      onClick={() => setIsNotificationPanelOpen(true)}
                      className="relative p-2 text-gray-600 hover:text-deep-forest hover:bg-sandstone rounded-lg transition-colors duration-200"
                      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>
                    
                    {/* User Menu */}
                    <div className="flex items-center space-x-2">
                      <span className="hidden sm:block text-sm text-gray-600">
                        Welcome, <span className="font-medium text-deep-forest">{user?.username}</span>
                      </span>
                      <Link to="/profile" className="btn-ghost text-sm">
                        Profile
                      </Link>
                      <button
                        onClick={signout}
                        className="btn-ghost text-sm"
                        aria-label="Sign out of your account"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login" className="btn-ghost text-sm">
                      Sign In
                    </Link>
                    <Link to="/signup" className="btn-primary text-sm">
                      Sign Up
                    </Link>
                  </div>
                )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-deep-forest hover:bg-sandstone transition-colors duration-200"
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-sandstone-dark bg-white" role="navigation" aria-label="Mobile navigation">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive('/') ? 'bg-sandstone text-deep-forest' : 'text-gray-700 hover:text-deep-forest hover:bg-sandstone'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/destinations" 
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive('/destinations') ? 'bg-sandstone text-deep-forest' : 'text-gray-700 hover:text-deep-forest hover:bg-sandstone'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Destinations
              </Link>
                  {isLoggedIn && (
                    <div className="px-3 py-2 border-t border-sandstone-dark">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {user?.credits || 0} credits
                        </span>
                        <button
                          onClick={() => {
                            signout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="btn-ghost text-sm"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
            </div>
          </div>
        )}
      </div>
      
      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
      />
    </header>
  );
};

export default Header;
