-- Storage Bucket Policies for Uncharted Travel App
-- Run this in your Supabase SQL Editor after setting up the database schema
-- This configures the travel-images bucket for image uploads

-- IMPORTANT: Storage policies in Supabase are managed through the Dashboard, not SQL
-- This script provides the policy definitions that you need to create manually

-- 1. Go to your Supabase Dashboard → Storage → travel-images bucket
-- 2. Click on "Policies" tab
-- 3. Create the following policies manually:

/*
POLICY 1: "Authenticated users can upload to their posts folder"
- Operation: INSERT
- Target roles: authenticated
- Policy definition:
bucket_id = 'travel-images' AND auth.role() = 'authenticated' AND (storage.foldername(name))[1] = 'posts' AND (storage.foldername(name))[2] = auth.uid()::text

POLICY 2: "Authenticated users can upload to attractions folder"
- Operation: INSERT  
- Target roles: authenticated
- Policy definition:
bucket_id = 'travel-images' AND auth.role() = 'authenticated' AND (storage.foldername(name))[1] = 'attractions'

POLICY 3: "Public can view all images"
- Operation: SELECT
- Target roles: public
- Policy definition:
bucket_id = 'travel-images'

POLICY 4: "Users can update their own post images"
- Operation: UPDATE
- Target roles: authenticated
- Policy definition:
bucket_id = 'travel-images' AND auth.role() = 'authenticated' AND (storage.foldername(name))[1] = 'posts' AND (storage.foldername(name))[2] = auth.uid()::text

POLICY 5: "Users can delete their own post images"
- Operation: DELETE
- Target roles: authenticated
- Policy definition:
bucket_id = 'travel-images' AND auth.role() = 'authenticated' AND (storage.foldername(name))[1] = 'posts' AND (storage.foldername(name))[2] = auth.uid()::text

POLICY 6: "Users can delete attraction images"
- Operation: DELETE
- Target roles: authenticated
- Policy definition:
bucket_id = 'travel-images' AND auth.role() = 'authenticated' AND (storage.foldername(name))[1] = 'attractions'
*/

-- 2. Manual Setup Instructions:
-- 
-- Step 1: Go to Supabase Dashboard → Storage
-- Step 2: Find the 'travel-images' bucket (create it if it doesn't exist)
-- Step 3: Click on the bucket → Policies tab
-- Step 4: Click "New Policy" for each policy above
-- Step 5: Copy the policy definitions from the comments above
-- Step 6: Save each policy

-- 3. Alternative: Use Supabase CLI (if you have it installed)
-- supabase storage policy create travel-images --name "Authenticated users can upload to their posts folder" --operation INSERT --definition "bucket_id = 'travel-images' AND auth.role() = 'authenticated' AND (storage.foldername(name))[1] = 'posts' AND (storage.foldername(name))[2] = auth.uid()::text"

-- 4. Test the setup
-- After creating the policies, try uploading an image in the app
-- The upload should work and you should see the image in your Supabase Storage dashboard
