# 🚀 Uncharted Travel App Setup Guide

## Quick Start (See UI Immediately)

The app is now running with demo credentials so you can see the beautiful UI! Visit `http://localhost:3001` to see:

- ✅ **Beautiful UI** - Hero section, feature cards, navbar, footer
- ✅ **Responsive Design** - Mobile-first with brand colors
- ✅ **Authentication UI** - Signup/login forms (demo mode)

## 🔧 Full Setup (For Real Functionality)

To enable full functionality (authentication, database, etc.), you need to set up Supabase:

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login and create a new project
3. Wait for the project to be ready (2-3 minutes)

### 2. Get Your Credentials

In your Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key

### 3. Create Environment File

Create a `.env` file in your project root with:

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_SUPABASE_STORAGE_BUCKET=travel-images

# API Configuration
REACT_APP_API_TIMEOUT=10000
REACT_APP_NOTIFICATIONS_POLL_INTERVAL=30000
```

### 4. Set Up Database

Run the SQL schema from `database/schema.sql` in your Supabase SQL editor:

1. Go to **SQL Editor** in Supabase dashboard
2. Copy and paste the contents of `database/schema.sql`
3. Click **Run** to create all tables

### 5. Configure Storage for Images

Set up the storage bucket policies for image uploads:

1. Go to **Storage** in your Supabase dashboard
2. Create the `travel-images` bucket if it doesn't exist
3. Click on the bucket → **Policies** tab
4. Create the following 6 policies (see `database/setup-storage-policies.sql` for exact definitions):
   - **Policy 1**: Authenticated users can upload to their posts folder
   - **Policy 2**: Authenticated users can upload to attractions folder  
   - **Policy 3**: Public can view all images
   - **Policy 4**: Users can update their own post images
   - **Policy 5**: Users can delete their own post images
   - **Policy 6**: Users can delete attraction images

This enables:
- ✅ **Image Uploads** - Users can upload images to posts and experiences
- ✅ **Public Access** - Images are viewable by everyone
- ✅ **Security** - Users can only modify their own images

### 6. Seed Data (Optional)

Run the seed script to add sample destinations:

```bash
node scripts/seedDestinations.js
```

### 7. Restart the App

```bash
npm start
```

## 🎯 What You'll Get

With full setup, you'll have:

- ✅ **Real Authentication** - Signup, login, logout
- ✅ **User Profiles** - Credits, reputation, interests
- ✅ **Destination Database** - 50+ unique destinations
- ✅ **Quiz System** - Smart destination matching
- ✅ **Community Features** - Posts, tips, reviews
- ✅ **Ask a Local** - Q&A with locals
- ✅ **Image Upload** - Profile and post images

## 🧪 Test Account

Once set up, you can test with:
- **Email**: `test@example.com`
- **Password**: `TestPass123!`

## 🎨 UI Features Already Working

Even in demo mode, you can see:

- **Hero Section** - "Explore the Unseen" with CTA
- **Feature Cards** - 6 beautiful feature showcases
- **Responsive Navbar** - Logo, navigation, auth buttons
- **Footer** - Social links and branding
- **Mobile Design** - Touch-friendly, responsive layout
- **Brand Colors** - Deep Forest, Warm Amber, Ocean Sky, etc.

## 🚨 Current Status

- ✅ **UI Complete** - Beautiful, responsive design
- ✅ **Authentication UI** - Forms and validation
- ✅ **TypeScript** - All errors fixed
- ✅ **Supabase Connection** - Credentials configured and working
- ✅ **Authentication** - Real Supabase authentication enabled
- ✅ **Public Access** - Users can browse and take quiz without signing up
- ✅ **Smart Auth Flow** - Only requires login for posting, asking questions, and profile

## 📱 Mobile Preview

The app is fully responsive and looks great on:
- 📱 Mobile (375px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🎉 Next Steps

1. **See the UI**: Visit `http://localhost:3001` now!
2. **Set up Supabase**: Follow the steps above for full functionality
3. **Test Authentication**: Once set up, try signing up and logging in
4. **Explore Features**: Take the quiz, browse destinations, create posts

---

**The app is ready to use! The UI is complete and beautiful. You just need to add your Supabase credentials for full functionality.**
