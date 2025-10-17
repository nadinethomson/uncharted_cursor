-- Fix Row Level Security Policies for Uncharted App
-- Run this in your Supabase SQL Editor
-- This version safely handles existing policies

-- 1. Enable RLS on users table (if not already enabled)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;

-- Create policies for users table
CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- 3. Enable RLS on other tables
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ask_a_local ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_visited ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- 4. Drop and recreate destination policies
DROP POLICY IF EXISTS "Destinations are viewable by everyone" ON destinations;
DROP POLICY IF EXISTS "Destinations can be inserted by authenticated users" ON destinations;

CREATE POLICY "Destinations are viewable by everyone" ON destinations
  FOR SELECT USING (true);

CREATE POLICY "Destinations can be inserted by authenticated users" ON destinations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 5. Drop and recreate post policies
DROP POLICY IF EXISTS "Posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Users can insert their own posts" ON posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;

CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = user_id);

-- 6. Drop and recreate ask_a_local policies
DROP POLICY IF EXISTS "Ask a local questions are viewable by everyone" ON ask_a_local;
DROP POLICY IF EXISTS "Users can insert their own questions" ON ask_a_local;
DROP POLICY IF EXISTS "Users can update their own questions" ON ask_a_local;

CREATE POLICY "Ask a local questions are viewable by everyone" ON ask_a_local
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own questions" ON ask_a_local
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questions" ON ask_a_local
  FOR UPDATE USING (auth.uid() = user_id);

-- 7. Drop and recreate saved_visited policies
DROP POLICY IF EXISTS "Users can manage their own saved/visited" ON saved_visited;
CREATE POLICY "Users can manage their own saved/visited" ON saved_visited
  FOR ALL USING (auth.uid() = user_id);

-- 8. Drop and recreate notification policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;

CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- 9. Drop and recreate credit_transactions policies
DROP POLICY IF EXISTS "Users can view their own credit transactions" ON credit_transactions;
DROP POLICY IF EXISTS "Users can insert their own credit transactions" ON credit_transactions;

CREATE POLICY "Users can view their own credit transactions" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credit transactions" ON credit_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 10. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
