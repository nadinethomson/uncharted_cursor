-- Stripe Credit Purchase Integration
-- Run this SQL to add the credit purchase functionality

-- Credit purchases table (for Stripe payment tracking)
CREATE TABLE credit_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_payment_intent_id VARCHAR(255),
  amount_gbp DECIMAL(10, 2) NOT NULL,
  credits_purchased INT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','completed','failed','refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Add purchase_id column to credit_transactions table (after creating credit_purchases)
ALTER TABLE credit_transactions 
ADD COLUMN purchase_id UUID REFERENCES credit_purchases(id) ON DELETE SET NULL;

-- Indexes for credit_purchases table
CREATE INDEX idx_purchases_user ON credit_purchases(user_id);
CREATE INDEX idx_purchases_stripe_session ON credit_purchases(stripe_session_id);
CREATE INDEX idx_purchases_status ON credit_purchases(status);
CREATE INDEX idx_purchases_created_at ON credit_purchases(created_at DESC);

-- RLS policies for credit_purchases
ALTER TABLE credit_purchases ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own purchases
CREATE POLICY "Users can view own purchases" ON credit_purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Allow service role to insert purchases (for Edge Functions)
CREATE POLICY "Service role can insert purchases" ON credit_purchases
  FOR INSERT WITH CHECK (true);

-- Allow service role to update purchases (for webhook processing)
CREATE POLICY "Service role can update purchases" ON credit_purchases
  FOR UPDATE USING (true);

-- Function to process credit purchases atomically
CREATE OR REPLACE FUNCTION process_credit_purchase(
  purchase_id UUID,
  user_id UUID,
  credits_to_add INT,
  payment_intent_id TEXT
)
RETURNS void AS $$
BEGIN
  -- Update the purchase record
  UPDATE credit_purchases 
  SET 
    status = 'completed',
    completed_at = NOW(),
    stripe_payment_intent_id = payment_intent_id
  WHERE id = purchase_id;

  -- Add credits to user
  UPDATE users 
  SET 
    credits = credits + credits_to_add,
    reputation = reputation + credits_to_add,
    updated_at = NOW()
  WHERE id = user_id;

  -- Create credit transaction record
  INSERT INTO credit_transactions (
    user_id,
    amount,
    type,
    purchase_id,
    status
  ) VALUES (
    user_id,
    credits_to_add,
    'purchase',
    purchase_id,
    'completed'
  );
END;
$$ LANGUAGE plpgsql;

-- Function to deduct credits (for refunds)
CREATE OR REPLACE FUNCTION deduct_credits(
  user_id UUID,
  amount INT,
  reason TEXT
)
RETURNS void AS $$
BEGIN
  -- Deduct credits from user (ensure they don't go negative)
  UPDATE users 
  SET 
    credits = GREATEST(0, credits - amount),
    reputation = GREATEST(0, reputation - amount),
    updated_at = NOW()
  WHERE id = user_id;

  -- Create credit transaction record
  INSERT INTO credit_transactions (
    user_id,
    amount,
    type,
    status
  ) VALUES (
    user_id,
    -amount,
    reason,
    'completed'
  );
END;
$$ LANGUAGE plpgsql;
