# 🗄️ Database Setup Instructions

## Quick Setup Steps

### 1. Go to Your Supabase Dashboard
1. Open [supabase.com](https://supabase.com)
2. Sign in and select your project
3. Go to **SQL Editor** (left sidebar)

### 2. Run the Database Schema
1. Copy the entire contents of `database/schema.sql`
2. Paste it into the SQL Editor
3. Click **Run** to execute

### 3. Configure Storage for Images
1. Go to **Storage** in your Supabase dashboard
2. Create the `travel-images` bucket if it doesn't exist
3. Click on the bucket → **Policies** tab
4. Create the 6 policies listed in `database/setup-storage-policies.sql`

This enables image uploads for posts and experiences.

### 4. Verify Tables Created
After running the schema, you should see these tables in your **Table Editor**:
- ✅ `users`
- ✅ `destinations` 
- ✅ `posts`
- ✅ `ask_a_local`
- ✅ `saved_visited`
- ✅ `notifications`
- ✅ `credit_transactions`

### 5. Test Authentication
Once the schema is set up:
1. Try signing up with a **new email address** (not test@example.com)
2. The signup should work and create a user profile
3. You should see the user in your `users` table

## 🔧 What the Schema Does

The schema creates:
- **Users table** with credits, reputation, interests
- **Destinations table** for the quiz system
- **Posts table** for community tips
- **Ask a Local** table for Q&A
- **Credit transactions** for atomic operations
- **Proper permissions** for authenticated users
- **RPC functions** for atomic credit updates

## 🚨 Common Issues

### "User already registered" Error
- This means the email is already in your Supabase auth
- Try a different email address
- Or delete the user from Supabase Auth dashboard

### "403 Forbidden" Error
- This means the database schema isn't set up yet
- Run the schema.sql file in your Supabase SQL Editor

### "Profile creation failed"
- Usually means the users table doesn't exist
- Make sure you ran the complete schema.sql

### "Image upload failed" or "Failed to upload image"
- This means the storage policies aren't configured
- Go to Storage → travel-images bucket → Policies tab
- Create the 6 policies listed in `database/setup-storage-policies.sql`
- Make sure the `travel-images` bucket exists in your Supabase Storage

## ✅ Success Indicators

After setup, you should see:
- ✅ No more 403 errors
- ✅ Successful signup with new emails
- ✅ User appears in users table with 10 credits
- ✅ Authentication state updates in the UI

## 🧪 Test Account

Once set up, you can test with:
- **Email**: `test@example.com` (if you created this user)
- **Password**: `TestPass123!`

Or create a new account with any email address.








