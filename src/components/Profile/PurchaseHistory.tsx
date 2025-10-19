import React, { useState, useEffect } from 'react';
import { fetchPurchaseHistory, formatCurrency, getStatusBadgeColor, getStatusText } from '../../services/stripeService';
import { CreditPurchase } from '../../types';

interface PurchaseHistoryProps {
  userId: string;
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({ userId }) => {
  const [purchases, setPurchases] = useState<CreditPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPurchaseHistory();
  }, [userId]);

  const loadPurchaseHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const purchaseHistory = await fetchPurchaseHistory(userId);
      setPurchases(purchaseHistory);
    } catch (err: any) {
      console.error('Load purchase history error:', err);
      setError(err.message || 'Failed to load purchase history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPackageName = (credits: number, amount: number) => {
    if (credits === 10 && amount === 1) return 'Starter Pack';
    if (credits === 50 && amount === 5) return 'Explorer Pack';
    if (credits === 110 && amount === 10) return 'Adventure Pack';
    return `${credits} Credits`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Purchase History</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Purchase History</h3>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
          <button
            onClick={loadPurchaseHistory}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Purchase History</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">💳</div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h4>
          <p className="text-gray-600">
            Your credit purchase history will appear here once you make your first purchase.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Purchase History</h3>
      
      <div className="space-y-3">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900">
                    {getPackageName(purchase.credits_purchased, purchase.amount_gbp)}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(purchase.status)}`}
                  >
                    {getStatusText(purchase.status)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{purchase.credits_purchased} Credits</span>
                  <span>•</span>
                  <span>{formatCurrency(purchase.amount_gbp)}</span>
                  <span>•</span>
                  <span>{formatDate(purchase.created_at)}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(purchase.amount_gbp)}
                </div>
                <div className="text-sm text-gray-500">
                  {purchase.credits_purchased} credits
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
