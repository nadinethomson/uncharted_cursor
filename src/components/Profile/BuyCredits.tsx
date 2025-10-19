import React, { useState } from 'react';
import { CREDIT_PACKAGES, createCheckoutSession, formatCurrency } from '../../services/stripeService';
import { CreditPackage } from '../../types';

interface BuyCreditsProps {
  onPurchaseStart?: () => void;
  onPurchaseComplete?: () => void;
}

const BuyCredits: React.FC<BuyCreditsProps> = ({ onPurchaseStart, onPurchaseComplete }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async (packageType: CreditPackage['id']) => {
    setLoading(packageType);
    setError(null);

    try {
      onPurchaseStart?.();
      const { url } = await createCheckoutSession(packageType);
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err: any) {
      console.error('Purchase error:', err);
      setError(err.message || 'Failed to start purchase');
      onPurchaseComplete?.();
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Buy Credits
        </h3>
        <p className="text-sm text-gray-600">
          Purchase credits to ask questions and unlock premium features
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CREDIT_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative border rounded-lg p-6 ${
              pkg.popular 
                ? 'border-sandstone bg-sandstone-light' 
                : 'border-gray-200 bg-white'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-sandstone text-white px-3 py-1 rounded-full text-xs font-medium">
                  Best Value
                </span>
              </div>
            )}

            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                {pkg.name}
              </h4>
              
              <div className="mb-4">
                <div className="text-3xl font-bold text-sandstone">
                  {formatCurrency(pkg.price)}
                </div>
                <div className="text-sm text-gray-600">
                  {pkg.credits} Credits
                  {pkg.bonus && (
                    <span className="text-green-600 ml-1">
                      (+{pkg.bonus} bonus)
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {pkg.description}
              </p>

              <button
                onClick={() => handlePurchase(pkg.id)}
                disabled={loading === pkg.id}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  pkg.popular
                    ? 'bg-sandstone text-white hover:bg-sandstone-dark disabled:opacity-50'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50'
                }`}
              >
                {loading === pkg.id ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Buy ${pkg.credits} Credits`
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Secure payment powered by Stripe. Your payment information is never stored on our servers.
        </p>
      </div>
    </div>
  );
};

export default BuyCredits;
