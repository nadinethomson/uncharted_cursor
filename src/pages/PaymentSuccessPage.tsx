import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { updateCredits } from '../store/userSlice';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchase, setPurchase] = useState<any>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    // Wait a moment for auth to initialize
    const timer = setTimeout(() => {
      if (!user) {
        setError('Please log in to view your purchase. You will be redirected to login.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        setLoading(false);
        return;
      }

      verifyPurchase();
    }, 1000);

    return () => clearTimeout(timer);
  }, [sessionId, user, navigate]);

  const verifyPurchase = async () => {
    try {
      // Check if user is still authenticated
      if (!user) {
        setError('Authentication expired. Please log in again.');
        setLoading(false);
        return;
      }

      // Get the purchase record
      const { data: purchaseData, error: purchaseError } = await supabase
        .from('credit_purchases')
        .select('*')
        .eq('stripe_session_id', sessionId)
        .eq('user_id', user.id)
        .single();

      if (purchaseError || !purchaseData) {
        setError('Purchase not found or not completed yet');
        setLoading(false);
        return;
      }

      if (purchaseData.status !== 'completed') {
        setError('Purchase is still processing. Please wait a moment and refresh.');
        setLoading(false);
        return;
      }

      setPurchase(purchaseData);

      // Refresh user credits in Redux store
      if (user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('credits')
          .eq('id', user.id)
          .single();

        if (!userError && userData) {
          dispatch(updateCredits({
            amount: 0,
            newTotal: userData.credits
          }));
        }
      }

    } catch (err: any) {
      console.error('Verify purchase error:', err);
      setError('Failed to verify purchase');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-sandstone border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying your purchase...</h2>
          <p className="text-gray-600">Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Verification Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={handleGoToProfile}
              className="w-full btn-primary px-6 py-3"
            >
              Go to Profile
            </button>
            {error.includes('Authentication') && (
              <button
                onClick={() => navigate('/login')}
                className="w-full btn-outline px-6 py-3"
              >
                Log In Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Confetti Animation */}
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="text-green-800 font-semibold mb-2">
            +{purchase?.credits_purchased} Credits Added
          </div>
          <div className="text-green-700 text-sm">
            Your account has been credited with {purchase?.credits_purchased} credits.
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <div>Package: {purchase?.credits_purchased === 10 ? 'Starter Pack' : 
                        purchase?.credits_purchased === 50 ? 'Explorer Pack' : 
                        'Adventure Pack'}</div>
          <div>Amount: £{purchase?.amount_gbp}</div>
          <div>Date: {new Date(purchase?.created_at).toLocaleDateString()}</div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoToProfile}
            className="w-full btn-primary px-6 py-3"
          >
            View Your Profile
          </button>
          
          <button
            onClick={() => navigate('/destinations')}
            className="w-full btn-outline px-6 py-3"
          >
            Explore Destinations
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          You can now ask questions and use premium features with your new credits!
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
