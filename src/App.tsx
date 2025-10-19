import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAuth } from './hooks/useAuth';

// Import pages
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import DestinationPage from './pages/DestinationPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import NotFoundPage from './pages/NotFoundPage';

// Import components
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Import styles
import './styles/globals.css';

// Main App component
function AppContent() {
  const { restoreUserSession } = useAuth();

  // Restore user session on app load
  useEffect(() => {
    restoreUserSession();
  }, [restoreUserSession]);

  return (
    <Router>
      <Routes>
            {/* Public routes - No authentication required */}
            <Route path="/" element={
              <Layout>
                <HomePage />
              </Layout>
            } />
            <Route path="/destinations" element={
              <Layout>
                <DestinationsPage />
              </Layout>
            } />
            <Route path="/quiz" element={
              <Layout>
                <QuizPage />
              </Layout>
            } />
            <Route path="/results" element={
              <Layout>
                <ResultsPage />
              </Layout>
            } />
            <Route path="/destination/:id" element={
              <Layout>
                <DestinationPage />
              </Layout>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Protected routes - Authentication required */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/payment-success" element={
              <ProtectedRoute>
                <PaymentSuccessPage />
              </ProtectedRoute>
            } />
        
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

// Root App component with Redux Provider
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;


