-- Uncharted Travel App Database Schema
-- This schema addresses the critical constraints for atomic transactions and state consistency

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  country VARCHAR(100) NOT NULL,
  interests JSONB NOT NULL DEFAULT '[]',
  credits INT DEFAULT 10 NOT NULL CHECK (credits >= 0),
  reputation INT DEFAULT 0 NOT NULL CHECK (reputation >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for users table
CREATE UNIQUE INDEX idx_users_username ON users(username);
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_credits ON users(credits);
CREATE INDEX idx_users_reputation ON users(reputation);

-- Destinations table
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  trip_style_tags JSONB NOT NULL DEFAULT '[]',
  interest_tags JSONB NOT NULL DEFAULT '[]',
  overview TEXT NOT NULL,
  key_attractions JSONB DEFAULT '[]',
  sustainability VARCHAR(10) CHECK (sustainability IN ('Low','Medium','High')),
  best_season VARCHAR(100),
  image_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  distance_km INT,
  budget_category VARCHAR(10) CHECK (budget_category IN ('Low','Medium','High')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for destinations table
CREATE INDEX idx_destinations_country ON destinations(country);
CREATE INDEX idx_destinations_active ON destinations(active);
CREATE INDEX idx_destinations_trip_style ON destinations USING GIN(trip_style_tags);
CREATE INDEX idx_destinations_interest_tags ON destinations USING GIN(interest_tags);
CREATE INDEX idx_destinations_sustainability ON destinations(sustainability);
CREATE INDEX idx_destinations_budget_category ON destinations(budget_category);

-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('tip','review','experience')),
  content TEXT NOT NULL CHECK (length(content) > 0 AND length(content) <= 500),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for posts table
CREATE INDEX idx_posts_destination ON posts(destination_id);
CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_type ON posts(type);

-- Ask a Local table
CREATE TABLE ask_a_local (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  question TEXT NOT NULL CHECK (length(question) > 0 AND length(question) <= 300),
  answer TEXT CHECK (length(answer) <= 500),
  answered_by UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','answered','closed')),
  is_helpful BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for ask_a_local table
CREATE INDEX idx_ask_local_destination ON ask_a_local(destination_id);
CREATE INDEX idx_ask_local_user ON ask_a_local(user_id);
CREATE INDEX idx_ask_local_status ON ask_a_local(status);
CREATE INDEX idx_ask_local_answered_by ON ask_a_local(answered_by);
CREATE INDEX idx_ask_local_created_at ON ask_a_local(created_at DESC);

-- Saved and Visited destinations table
CREATE TABLE saved_visited (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('saved','visited')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, destination_id, type)
);

-- Indexes for saved_visited table
CREATE INDEX idx_saved_visited_user ON saved_visited(user_id);
CREATE INDEX idx_saved_visited_destination ON saved_visited(destination_id);
CREATE INDEX idx_saved_visited_type ON saved_visited(type);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  related_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for notifications table
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- Credit transactions table (for audit trail and rollback)
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  related_id UUID,
  purchase_id UUID REFERENCES credit_purchases(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending','completed','failed','reversed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for credit_transactions table
CREATE INDEX idx_transactions_user ON credit_transactions(user_id);
CREATE INDEX idx_transactions_status ON credit_transactions(status);
CREATE INDEX idx_transactions_created_at ON credit_transactions(created_at DESC);

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

-- Indexes for credit_purchases table
CREATE INDEX idx_purchases_user ON credit_purchases(user_id);
CREATE INDEX idx_purchases_stripe_session ON credit_purchases(stripe_session_id);
CREATE INDEX idx_purchases_status ON credit_purchases(status);
CREATE INDEX idx_purchases_created_at ON credit_purchases(created_at DESC);

-- Reports table (for content moderation)
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_by UUID REFERENCES users(id) ON DELETE SET NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  question_id UUID REFERENCES ask_a_local(id) ON DELETE CASCADE,
  reason VARCHAR(50),
  comment TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','reviewed','resolved','dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for reports table
CREATE INDEX idx_reports_reported_by ON reports(reported_by);
CREATE INDEX idx_reports_post ON reports(post_id);
CREATE INDEX idx_reports_question ON reports(question_id);
CREATE INDEX idx_reports_status ON reports(status);

-- Functions for atomic credit operations

-- Function to update credits atomically
CREATE OR REPLACE FUNCTION update_user_credits(
  p_user_id UUID,
  p_amount INT,
  p_type VARCHAR(50),
  p_related_id UUID DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  current_credits INT;
  new_credits INT;
  new_reputation INT;
  transaction_id UUID;
BEGIN
  -- Get current credits
  SELECT credits INTO current_credits FROM users WHERE id = p_user_id;
  
  -- Check if user exists
  IF current_credits IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not found');
  END IF;
  
  -- Calculate new credits
  new_credits := current_credits + p_amount;
  
  -- Prevent negative credits
  IF new_credits < 0 THEN
    RETURN jsonb_build_object('success', false, 'error', 'Insufficient credits');
  END IF;
  
  -- Update credits and reputation atomically
  UPDATE users 
  SET 
    credits = new_credits,
    reputation = new_credits, -- Reputation equals credits
    updated_at = NOW()
  WHERE id = p_user_id;
  
  -- Log the transaction
  INSERT INTO credit_transactions (user_id, amount, type, related_id, status)
  VALUES (p_user_id, p_amount, p_type, p_related_id, 'completed')
  RETURNING id INTO transaction_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'new_credits', new_credits,
    'new_reputation', new_credits,
    'transaction_id', transaction_id
  );
END;
$$ LANGUAGE plpgsql;

-- Function to rollback credit transaction
CREATE OR REPLACE FUNCTION rollback_credit_transaction(
  p_transaction_id UUID
) RETURNS JSONB AS $$
DECLARE
  transaction_record RECORD;
  new_credits INT;
BEGIN
  -- Get transaction details
  SELECT * INTO transaction_record 
  FROM credit_transactions 
  WHERE id = p_transaction_id AND status = 'completed';
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Transaction not found or already processed');
  END IF;
  
  -- Calculate new credits (reverse the transaction)
  new_credits := (
    SELECT credits FROM users WHERE id = transaction_record.user_id
  ) - transaction_record.amount;
  
  -- Update user credits
  UPDATE users 
  SET 
    credits = new_credits,
    reputation = new_credits,
    updated_at = NOW()
  WHERE id = transaction_record.user_id;
  
  -- Mark transaction as reversed
  UPDATE credit_transactions 
  SET status = 'reversed'
  WHERE id = p_transaction_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'new_credits', new_credits
  );
END;
$$ LANGUAGE plpgsql;

-- Function to get reputation tier
CREATE OR REPLACE FUNCTION get_reputation_tier(p_credits INT)
RETURNS VARCHAR(20) AS $$
BEGIN
  CASE
    WHEN p_credits >= 76 THEN RETURN 'Local Expert';
    WHEN p_credits >= 51 THEN RETURN 'Local';
    WHEN p_credits >= 21 THEN RETURN 'Active Traveller';
    ELSE RETURN 'New Traveller';
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ask_a_local ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_visited ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users can only see and modify their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Destinations are public (read-only for users)
CREATE POLICY "Destinations are viewable by everyone" ON destinations
  FOR SELECT USING (true);

-- Posts are public (read-only for users)
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Users can create own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Ask a Local policies
CREATE POLICY "Ask a Local questions are viewable by everyone" ON ask_a_local
  FOR SELECT USING (true);

CREATE POLICY "Users can create own questions" ON ask_a_local
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can answer questions" ON ask_a_local
  FOR UPDATE USING (auth.uid() = answered_by);

-- Saved/Visited destinations
CREATE POLICY "Users can manage own saved/visited" ON saved_visited
  FOR ALL USING (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Credit transactions (read-only for users)
CREATE POLICY "Users can view own transactions" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Credit purchases (read-only for users)
CREATE POLICY "Users can view own purchases" ON credit_purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Reports
CREATE POLICY "Users can create reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reported_by);

-- Triggers for updated_at timestamps

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ask_a_local_updated_at BEFORE UPDATE ON ask_a_local
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-close old Ask a Local questions (7 days)
CREATE OR REPLACE FUNCTION auto_close_old_questions()
RETURNS void AS $$
BEGIN
  UPDATE ask_a_local 
  SET status = 'closed', updated_at = NOW()
  WHERE status = 'pending' 
    AND created_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to run auto_close_old_questions daily
-- (This would be set up in Supabase dashboard or via pg_cron)

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

-- Insert some sample data for testing
INSERT INTO destinations (name, country, trip_style_tags, interest_tags, overview, sustainability, best_season, budget_category, distance_km) VALUES
('Kyoto, Japan', 'JP', '["Cultural", "Relaxed"]', '["Culture", "Food", "History"]', 'Experience authentic Japanese culture in ancient temples and traditional gardens. Kyoto offers serene experiences away from Tokyo''s hustle.', 'Medium', 'Spring, Autumn', 'Medium', 8000),
('Santorini, Greece', 'GR', '["Relaxed", "Cultural"]', '["Culture", "Food", "History"]', 'Stunning sunsets, white-washed buildings, and crystal-clear waters make Santorini a perfect romantic getaway.', 'Low', 'Summer', 'High', 2000),
('Banff National Park, Canada', 'CA', '["Nature", "Adventure"]', '["Nature", "Adventure", "Sustainability"]', 'Breathtaking mountain landscapes, pristine lakes, and abundant wildlife in Canada''s oldest national park.', 'High', 'Summer, Winter', 'Medium', 3000),
('Machu Picchu, Peru', 'PE', '["Adventure", "Cultural"]', '["Culture", "History", "Adventure"]', 'Ancient Incan citadel perched high in the Andes, offering incredible hiking and cultural experiences.', 'High', 'Dry season (May-October)', 'Low', 6000),
('Reykjavik, Iceland', 'IS', '["Nature", "Adventure"]', '["Nature", "Adventure", "Sustainability"]', 'Land of fire and ice with geysers, glaciers, and the Northern Lights. Perfect for nature lovers and adventure seekers.', 'High', 'Summer, Winter', 'High', 4000);

-- Create a function to seed more destinations (for development)
CREATE OR REPLACE FUNCTION seed_destinations()
RETURNS void AS $$
BEGIN
  -- This function would be called to seed more destinations
  -- Implementation would go here
  NULL;
END;
$$ LANGUAGE plpgsql;











