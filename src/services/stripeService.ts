import { supabase } from './supabase';
import { CreditPurchase, CreditPackage } from '../types';

/**
 * Service for handling Stripe payment operations
 * Handles credit purchases and purchase history
 */

// Credit packages configuration
export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'small',
    name: 'Starter Pack',
    credits: 10,
    price: 1.00,
    description: 'Perfect for trying out the platform'
  },
  {
    id: 'medium',
    name: 'Explorer Pack',
    credits: 50,
    price: 5.00,
    description: 'Great for regular travelers'
  },
  {
    id: 'large',
    name: 'Adventure Pack',
    credits: 110,
    price: 10.00,
    description: 'Best value with 10% bonus credits',
    bonus: 10,
    popular: true
  }
];

/**
 * Creates a Stripe checkout session for credit purchase
 * 
 * @param packageType - The credit package to purchase
 * @returns Promise<{ url: string }> - Checkout session URL
 * 
 * @throws {Error} If checkout session creation fails
 */
export async function createCheckoutSession(packageType: 'small' | 'medium' | 'large'): Promise<{ url: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { package: packageType }
    });

    if (error) {
      throw new Error(`Failed to create checkout session: ${error.message}`);
    }

    if (!data?.url) {
      throw new Error('No checkout URL returned');
    }

    return { url: data.url };
  } catch (error) {
    console.error('Create checkout session error:', error);
    throw error;
  }
}

/**
 * Fetches purchase history for a user
 * 
 * @param userId - User ID
 * @returns Promise<CreditPurchase[]> - Array of purchases
 * 
 * @throws {Error} If query fails
 */
export async function fetchPurchaseHistory(userId: string): Promise<CreditPurchase[]> {
  try {
    const { data: purchases, error } = await supabase
      .from('credit_purchases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch purchase history: ${error.message}`);
    }

    return purchases || [];
  } catch (error) {
    console.error('Fetch purchase history error:', error);
    throw error;
  }
}

/**
 * Gets a credit package by ID
 * 
 * @param packageId - Package ID
 * @returns CreditPackage | undefined
 */
export function getCreditPackage(packageId: 'small' | 'medium' | 'large'): CreditPackage | undefined {
  return CREDIT_PACKAGES.find(pkg => pkg.id === packageId);
}

/**
 * Formats currency for display
 * 
 * @param amount - Amount in GBP
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
}

/**
 * Gets status badge color for purchase status
 * 
 * @param status - Purchase status
 * @returns CSS class for status badge
 */
export function getStatusBadgeColor(status: CreditPurchase['status']): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'refunded':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Gets status display text
 * 
 * @param status - Purchase status
 * @returns Human-readable status text
 */
export function getStatusText(status: CreditPurchase['status']): string {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'pending':
      return 'Pending';
    case 'failed':
      return 'Failed';
    case 'refunded':
      return 'Refunded';
    default:
      return 'Unknown';
  }
}
