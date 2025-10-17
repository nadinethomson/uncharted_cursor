# Phase 1 Travel App Specification - Updated for Rebuild

**Last Updated:** October 11, 2025  
**Purpose:** Serve as single source of truth for Replit/Cursor rebuild  
**Status:** Incorporates learnings from Lovable prototype

---

## Table of Contents

1. [Overview](#overview)
2. [Primary User Personas](#primary-user-personas)
3. [Core Features](#core-features)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Quiz & Destination Matching](#quiz--destination-matching)
7. [Database Schema](#database-schema)
8. [Authentication & Session Management](#authentication--session-management)
9. [User Profile](#user-profile)
10. [Credits & Reputation](#credits--reputation)
11. [Saved & Visited Destinations](#saved--visited-destinations)
12. [Posts & Community Features](#posts--community-features)
13. [Add Experience / Attraction](#add-experience--attraction)
14. [Ask a Local Feature](#ask-a-local-feature)
15. [Notifications](#notifications)
16. [Images](#images)
17. [Content Moderation](#content-moderation)
18. [Error Handling](#error-handling)
19. [Navigation & UI/UX Details](#navigation--uiux-details)
20. [Seed Data Example](#seed-data-example)
21. [Caching & Free APIs](#caching--free-apis)
22. [Testing Requirements](#testing-requirements)
23. [Deployment & Environment](#deployment--environment)
24. [Edge Cases & Rollback](#edge-cases--rollback)
25. [Implementation Notes](#implementation-notes)

---

## Overview

**Purpose:**  
Provide a destination finder for adventurous travelers seeking off-the-beaten-path experiences. Users discover unique places and access recommendations from locals using a credit-based system.

**App Name:** Uncharted  
**Tagline:** "Explore the Unseen. Travel Uncharted."

**Phase 1 Scope:**  
- Lightweight, production-ready application
- Main page: Destination Finder (quiz-driven)
- Core features: profiles, posts, Ask a Local, saved/visited tracking
- Free API sources: Wikidata, Wikivoyage (optional; primarily use seeded data)
- Mobile-first responsive design

---

## Primary User Personas

1. **Adventurous Travelers** – Explore less-touristed locations, cultural immersion.
2. **Budget-conscious Travelers** – Seek authentic experiences without tourist traps.
3. **Sustainable Tourism Advocates** – Prefer destinations with lower visitor impact.
4. **Locals** – Share recommendations and gain credits/reputation.

---

## Core Features

- **Destination Finder:** Interactive quiz + filter → returns 3 destinations
- **Profile Management:** Username, country, interests; credits; reputation tier
- **Authentication:** Email/password signup and login via Supabase Auth
- **Community Posts:** Tips/reviews/experiences (max 500 chars, optional image)
- **Add Experience/Attraction:** Submit new attractions to destination (max 5 per destination)
- **Ask a Local:** Question/answer feature for local recommendations (5 credits per question)
- **Saved & Visited Destinations:** Track trips and interests
- **Community Tips Section:** Display 3 most recent tips per destination, expandable "See More"
- **Notifications:** Simple in-app badge for Ask a Local answers
- **Credits & Reputation System:** Earn/spend credits, tier progression

---

## Tech Stack

**Frontend:**
- React 18+ with functional components and hooks
- React Router v6+ for navigation
- Tailwind CSS for styling (mobile-first)
- Context API or Redux for state management (recommended: Redux Toolkit for complex credit/reputation logic)
- Axios or fetch for API calls

**Backend:**
- Supabase (PostgreSQL database, authentication, file storage)
- Supabase Auth for email/password authentication
- Supabase Storage for image uploads
- Supabase Realtime (optional, for notifications in Phase 2)

**Hosting:**
- Vercel or Netlify for frontend
- Supabase cloud for backend

**Environment:**
- Dev / Staging / Production
- Environment variables for Supabase URL, anon key, storage bucket

---

## Project Structure

**Note:** The prototype was organized as follows. Feel free to adapt this structure based on what works best for your codebase, but the critical constraint is **isolating credit/reputation/notification state and ensuring explicit transaction boundaries**. See "Critical Implementation Constraints" below.

**Prototype Structure (for reference):**

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   └── Layout.jsx
│   ├── Quiz/
│   │   ├── QuizStep1.jsx (Trip style)
│   │   ├── QuizStep2.jsx (Interests)
│   │   ├── QuizStep3.jsx (Filters)
│   │   ├── QuizFlow.jsx (Container)
│   │   └── QuizResults.jsx
│   ├── Destination/
│   │   ├── DestinationCard.jsx
│   │   ├── DestinationDetail.jsx
│   │   ├── AttractionsList.jsx
│   │   └── TravelInfo.jsx
│   ├── Community/
│   │   ├── PostForm.jsx
│   │   ├── PostsList.jsx
│   │   ├── PostCard.jsx
│   │   ├── AskALocal.jsx
│   │   └── AskALocalForm.jsx
│   ├── Profile/
│   │   ├── ProfilePage.jsx
│   │   ├── CreditsDisplay.jsx
│   │   ├── ReputationBadge.jsx
│   │   ├── SavedDestinations.jsx
│   │   ├── VisitedDestinations.jsx
│   │   └── UserPosts.jsx
│   ├── Common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── EmptyState.jsx
│   └── Experience/
│       ├── AddExperienceModal.jsx
│       └── ExperienceForm.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── QuizPage.jsx
│   ├── ResultsPage.jsx
│   ├── DestinationPage.jsx
│   ├── ProfilePage.jsx
│   └── NotFoundPage.jsx
├── services/
│   ├── supabase.js (client initialization)
│   ├── authService.js (signup, login, logout)
│   ├── userService.js (profile CRUD)
│   ├── destinationService.js (fetch destinations, matching)
│   ├── postService.js (create, fetch posts)
│   ├── creditService.js (credit transactions, reputation)
│   ├── localService.js (ask a local CRUD)
│   ├── imageService.js (upload, delete images)
│   └── notificationService.js (fetch, mark read)
├── store/
│   ├── authSlice.js (Redux: auth state)
│   ├── userSlice.js (Redux: user profile, credits, reputation)
│   ├── destinationSlice.js (Redux: current destinations, filters)
│   ├── postSlice.js (Redux: posts, comments)
│   └── store.js (Redux store configuration)
├── hooks/
│   ├── useAuth.js (authentication hook)
│   ├── useUser.js (user profile hook)
│   ├── useCredits.js (credit management hook)
│   ├── useDestinations.js (destination fetching/matching)
│   └── useNotifications.js (notification hook)
├── utils/
│   ├── constants.js (trip styles, interests, budget, distance options)
│   ├── destinationMatcher.js (quiz matching algorithm)
│   ├── creditCalculator.js (credit earning/spending logic)
│   ├── reputationTier.js (tier calculation)
│   ├── validators.js (form validation)
│   ├── errorMessages.js (travel-themed error messages)
│   └── dateUtils.js (timestamp formatting)
├── styles/
│   ├── tailwind.config.js
│   ├── globals.css
│   └── components.css (custom Tailwind component definitions)
├── App.jsx (main app router)
├── index.jsx (React DOM render)
└── env.example (template for environment variables)

public/
├── index.html
└── favicon.ico

tests/
├── unit/
│   ├── destinationMatcher.test.js
│   ├── creditCalculator.test.js
│   └── reputationTier.test.js
├── integration/
│   ├── auth.integration.test.js
│   ├── posts.integration.test.js
│   └── credits.integration.test.js
└── setup.js (test environment configuration)

.env.example
.env.local (gitignored)
package.json
README.md
```

**Adapt as Needed:** You may prefer a different structure (feature-based modules, flat hierarchy, different naming conventions, etc.). The structure above is provided as reference from the working prototype. Choose an organization that makes sense for your team, but prioritize solving the critical constraints outlined below.

---

## Critical Implementation Constraints

**The following constraints are NOT about project structure—they're about core architecture decisions. These caused regressions in the Lovable prototype and must be solved explicitly in this rebuild:**

### 1. Credit Transaction Boundaries

**Problem:** The Lovable prototype struggled with race conditions and inconsistency when multiple credit operations happened simultaneously or when one step of a multi-step operation failed.

**Requirement:** All credit transactions must be **atomic** and **explicit**. 

**Must Have:**
- Credit operations must use database transactions (BEGIN/COMMIT/ROLLBACK)
- Credit deduction and post creation must happen in same transaction
- If post creation fails, credits are not deducted
- If credit update fails, post is rolled back
- Multiple simultaneous credit updates must not cause double-counting

**Example of what to test:**
```javascript
// This must fail atomically (post exists, credits not deducted)
// OR succeed completely (post exists, credits deducted)
// Never: post exists, credits not deducted (inconsistent state)
await createPostWithCredits(userId, postData);
```

**Implementation Approach:**
- Use Supabase RPC functions or triggers for transaction handling
- OR use application-level transaction management with explicit rollback
- Write integration tests that verify atomic behavior (see Testing section)

---

### 2. State Consistency & Immutability

**Problem:** The Lovable prototype saw state inconsistencies where new features would inadvertently mutate old feature state (e.g., adding Ask a Local feature caused post credit amounts to calculate incorrectly).

**Requirement:** State must be managed with **strict immutability patterns** and **clear ownership**.

**Must Have:**
- Redux or equivalent state container (NOT global variables)
- Each feature owns its state slice (auth, user, posts, credits, notifications)
- State updates use immutable patterns (never mutate existing objects)
- Selectors extract derived state (e.g., reputation tier calculated from credits)
- Avoid shared mutable state between features

**Example of what NOT to do:**
```javascript
// Bad: mutating shared state
const user = store.getState().user;
user.credits = user.credits + 5; // This mutates store
```

**Example of what to do:**
```javascript
// Good: immutable update
dispatch(addCredits({ userId, amount: 5 }));
// Reducer returns new state object without mutating
return { ...state, credits: state.credits + 5 };
```

**Implementation Approach:**
- Use Redux Toolkit (handles immutability well)
- Use Redux Selectors to compute derived values (reputation tier, credit display, etc.)
- Separate notification state from user state (don't mix)
- Write unit tests for each state slice in isolation

---

### 3. Feature Isolation & Testing

**Problem:** The Lovable prototype couldn't isolate bugs because features were tightly coupled. When a new feature was added, it would reintroduce bugs in unrelated features.

**Requirement:** Each feature must be **independently testable** and **loosely coupled**.

**Must Have:**
- Business logic (credit calculation, matching algorithm, tier calculation) extracted to pure functions
- Services layer isolated from components (can test without React)
- Integration tests for each multi-step feature (post creation, ask a local, credit spending)
- Unit tests for business logic functions
- Mock data for tests (don't hit real database)

**Example of what to test:**
```javascript
// Unit test: pure function, no side effects
test('creditCalculator adds correct amount', () => {
  expect(calculateCredits('tip')).toBe(5);
  expect(calculateCredits('experience')).toBe(10);
});

// Integration test: multi-step flow with database
test('creating post deducts credits and updates reputation', async () => {
  // Setup: user with 10 credits
  // Action: create post
  // Assert: credits = 15, reputation = Active Traveller
});
```

**Implementation Approach:**
- Extract business logic to `utils/` folder (destinationMatcher, creditCalculator, reputationTier)
- Extract database operations to `services/` folder (creditService, postService)
- Write unit tests for utils (pure functions)
- Write integration tests for services (with database)
- Use test fixtures/seeds for consistent data

---

### 4. Explicit Dependency Management

**Problem:** The Lovable prototype had unclear dependencies between features. It wasn't obvious which components depended on which data, causing unexpected side effects when data changed.

**Requirement:** Dependencies must be **explicit** and **trackable**.

**Must Have:**
- Clear service dependencies (which service calls which)
- Components receive props explicitly (no "magic" global state)
- Hooks clearly state what they depend on (dependency arrays in useEffect)
- No circular dependencies between services
- Data flows in one direction (components → services → database)

**Example of what to avoid:**
```javascript
// Bad: unclear dependencies
function PostCard() {
  const user = useSelector(state => state.user); // Which user? Why?
  const credits = useSelector(state => state.credits); // Where do these come from?
}
```

**Example of what to do:**
```javascript
// Good: explicit props and hooks
function PostCard({ post, currentUser, onDelete }) {
  const { user } = useAuth(); // Hook clearly states it needs auth
  useEffect(() => {
    // dependency array is explicit
  }, [post.id, currentUser.id]);
}
```

**Implementation Approach:**
- Use React props for feature data (not global state for everything)
- Keep Redux state minimal (auth, user profile, notifications)
- Use Context API for UI state only (modals, theme, toast messages)
- Document service dependencies in comments/README

---

### 5. Error Recovery & Rollback

**Problem:** The Lovable prototype didn't have clear error recovery. If a multi-step operation failed midway, the UI and database could be in inconsistent states.

**Requirement:** All multi-step operations must have **explicit rollback** and **user-facing error recovery**.

**Must Have:**
- Database transactions for atomic operations (see constraint #1)
- Error messages that explain what happened and what to do
- Retry mechanisms for failed operations
- UI state rollback when operations fail (e.g., if image upload fails, post isn't marked as submitted)

**Example of what to implement:**
```javascript
// Multi-step operation with explicit rollback
async function createPostWithImage(postData, image) {
  try {
    // Step 1: Upload image
    const imageUrl = await uploadImage(image);
    
    // Step 2: Create post with image
    const post = await createPost({ ...postData, imageUrl });
    
    // Step 3: Update credits
    await addCredits(userId, 5);
    
    return post;
  } catch (error) {
    // Rollback: delete uploaded image if post creation fails
    if (imageUrl) await deleteImage(imageUrl);
    throw error;
  }
}
```

**Implementation Approach:**
- Use try/catch blocks with explicit cleanup in catch
- Implement retry logic for transient failures (network timeouts)
- Show specific error messages to users (see Error Handling section)
- Log errors to Sentry for debugging

---

**Summary:** The structure of the code is less important than solving these five constraints. A perfectly organized folder structure with poor transaction handling will still have bugs. A slightly messy structure with clear isolation and immutability will be maintainable.

---

## Quiz & Destination Matching

**Quiz Questions:**
1. **Trip style preference** (mandatory, single select)
   - Adventure
   - Cultural
   - Relaxed
   - Nature
   - Food

2. **Interests** (mandatory, multi-select, minimum 1)
   - Nature
   - Culture
   - Food
   - History
   - Adventure
   - Sustainability

3. **Budget** (mandatory, single select)
   - Low
   - Medium
   - High

4. **Distance from home** (mandatory, single select)
   - Near (<100km)
   - Medium (100–500km)
   - Far (500+km)

**Matching Algorithm:**

```javascript
// Pseudo-code for destination matching
function matchDestinations(quizAnswers, destinations) {
  const scored = destinations.map(dest => {
    let score = 0;
    
    // Trip style match: 1 point if ANY destination trip style matches
    if (dest.trip_style_tags.includes(quizAnswers.tripStyle)) {
      score += 1;
    }
    
    // Interest matches: 1 point per matching interest
    quizAnswers.interests.forEach(interest => {
      if (dest.interest_tags.includes(interest)) {
        score += 1;
      }
    });
    
    return { ...dest, score };
  });
  
  // Filter by distance (eliminate unmatched)
  const filtered = scored.filter(dest => 
    filterByDistance(dest, quizAnswers.distance) &&
    filterByBudget(dest, quizAnswers.budget)
  );
  
  // Sort by score (descending), tie-break with random
  filtered.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return Math.random() - 0.5;
  });
  
  // Return top 3
  return filtered.slice(0, 3);
}
```

**Important:** Filters use AND logic (destination must match both distance AND budget to be included).

**Quiz Results Display:**
- Show 3 destination cards on single page
- Each card: image, title, overview, "Why this matches you" (static text)
- "Retake Quiz" button prominent
- "Adjust Filters" option to refine results

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  country VARCHAR(100) NOT NULL,
  interests JSONB NOT NULL DEFAULT '[]',
  credits INT DEFAULT 10 NOT NULL,
  reputation INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_users_username ON users(username);
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

### Destinations Table
```sql
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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_destinations_country ON destinations(country);
CREATE INDEX idx_destinations_active ON destinations(active);
CREATE INDEX idx_destinations_trip_style ON destinations USING GIN(trip_style_tags);
CREATE INDEX idx_destinations_interest_tags ON destinations USING GIN(interest_tags);
```

**Note:** `distance_km` and `budget_category` are stored on destination for filtering. If a destination doesn't have these set, assume default behavior (don't filter it out, or use heuristics).

### Posts Table
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('tip','review','experience')),
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_posts_destination ON posts(destination_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_user ON posts(user_id);
```

**Post Types:**
- `tip`: General travel tip (+5 credits)
- `review`: Destination review (+5 credits)
- `experience`: Share an experience/attraction (+10 credits)

### Ask_a_Local Table
```sql
CREATE TABLE ask_a_local (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT,
  answered_by UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','answered','closed')),
  is_helpful BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ask_local_destination ON ask_a_local(destination_id);
CREATE INDEX idx_ask_local_status ON ask_a_local(status);
CREATE INDEX idx_ask_local_answered_by ON ask_a_local(answered_by);
```

### Saved_Visited Table
```sql
CREATE TABLE saved_visited (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('saved','visited')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, destination_id, type)
);

CREATE INDEX idx_saved_visited_user ON saved_visited(user_id);
CREATE INDEX idx_saved_visited_destination ON saved_visited(destination_id);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  related_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

**Notification Types:**
- `ask_answered`: Someone answered your local question

### Credit_Transactions Table (for audit trail)
```sql
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  related_id UUID,
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending','completed','failed','reversed')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_user ON credit_transactions(user_id);
```

---

## Authentication & Session Management

**Signup:**
- Email validation (format check, not already in use)
- Password requirements: min 8 chars, 1 number, 1 special character
- Username: 3–20 alphanumeric characters, unique
- Country: ISO country code (dropdown)
- Interests: select at least 1
- Account created via Supabase Auth
- User record created in `users` table with 10 initial credits

**Login:**
- Email and password
- Session token via Supabase Auth
- Token stored in secure HTTP-only cookie (Supabase handles)
- Session duration: 7 days, sliding window (refreshed on activity)

**Logout:**
- Clear session token
- Redirect to login page

**Password Reset:**
- Link sent via email (Supabase Auth handles)
- Token valid for 24 hours
- User sets new password
- Email delivered from noreply@supabase email

**Session Verification:**
- On app load, check if user is authenticated
- If not authenticated, redirect to login
- Protected routes require authentication

---

## User Profile

**Profile Display:**
- Username
- Country
- Interests (as tags/badges)
- Credits (numeric display)
- Reputation tier (badge with name and icon)
- Saved destinations (grid view, up to 12 visible, paginated)
- Visited destinations (grid view, up to 12 visible, paginated)
- User's posts (list view, most recent first, paginated)

**Profile Interactions:**
- Can view own profile
- Cannot view other users' profiles in Phase 1
- Can logout from profile page
- Edit profile: deferred to Phase 2

---

## Credits & Reputation

**Credit Mechanics:**
- Starting credits: 10 per new user
- Tip/Review post: +5 credits
- Add Experience: +10 credits
- Ask a Local question: -5 credits (blocks if insufficient)

**Credit Transaction Workflow:**
1. User initiates action (post, ask local)
2. Check if user has sufficient credits (if spending)
3. Create post/question in database
4. Deduct/add credits (within transaction)
5. Recalculate reputation tier
6. Update user record
7. If any step fails, rollback transaction and show error

**Reputation Tiers:**
| Tier | Credits | Appearance |
|------|---------|-----------|
| New Traveller | 0–20 | Icon + badge |
| Active Traveller | 21–50 | Icon + badge |
| Local | 51–75 | Icon + badge |
| Local Expert | 76+ | Icon + badge |

**Reputation Display:**
- Shown on profile
- Shown on posts/comments
- Used for local question answering (Local tier or above can answer)

**Important Constraints:**
- Credits cannot go negative (prevent user from going below 0)
- Reputation only increases (never decreases)
- Credit updates must use database transactions to prevent race conditions

---

## Saved & Visited Destinations

**Saved Destinations:**
- User can click "Save Destination" button on destination detail page
- Button toggles: first click saves, second click unsaves
- Saved destinations stored in `saved_visited` table (type='saved')
- Appear on user profile in grid

**Visited Destinations:**
- User can click "Mark as Visited" button on destination detail page
- Button toggles: first click marks visited, second click unmarks
- Visited destinations stored in `saved_visited` table (type='visited')
- Appear on user profile in grid

**Important:** User can have a destination both saved AND visited simultaneously (separate rows in table).

---

## Posts & Community Features

**Post Creation:**
- Modal form on destination detail page
- Fields: type (dropdown: tip/review/experience), content (textarea), image (optional file upload)
- Character limit: 500 characters
- Image: optional, max 2MB, JPG/PNG
- Validation: at least 1 character, image < 2MB
- On submit: deduct/add credits, create post, show success message

**Post Display (Community Tips Section):**
- Show 3 most recent posts on destination detail page
- Each post card: author, reputation badge, content, timestamp, optional image
- "See More" button expands to show all posts (chronological, newest first)
- No edit/delete functionality in Phase 1

**Profanity Filter:**
- Basic filter applied to content before submission
- If profanity detected, block submission and show error

---

## Add Experience / Attraction

**Feature Overview:**
- Modal form on destination detail page with "Add Experience" button
- Allow users to contribute new attractions/experiences
- Max 5 attractions per destination (enforced via form validation)
- Stored in `destinations.key_attractions` JSONB array

**Form Fields:**
- Name (text input, required)
- Description (textarea, required, max 300 chars)
- Image (file upload, optional, max 2MB)

**Submission Workflow:**
1. User fills form and clicks submit
2. Validate fields (name, description required)
3. If image, upload to Supabase Storage
4. Add attraction object to `destinations.key_attractions` array
5. Award +10 credits to user
6. Show success message
7. Close modal and refresh destination detail page

**Duplicate Prevention:**
- Check if attraction name already exists in destination (case-insensitive)
- If duplicate, show error: "This attraction already exists here"

**Display:**
- Attractions appear immediately after submission
- Listed on destination detail page
- Up to 5 displayed (truncated if more)

---

## Ask a Local Feature

**Feature Overview:**
- Separate section on destination detail page
- Users ask questions directed at locals
- Cost: 5 credits per question
- Only verified locals (country match, Local tier+) can answer

**Question Submission:**
- Form: textarea for question (max 300 chars)
- Submit button
- On submit: deduct 5 credits, create ask_a_local record, status='pending'
- Show confirmation: "Question posted! Local travelers in [destination] can now reply."

**Answering a Question:**
- Locals see pending questions in community section
- Click "Answer" to open reply form
- Write answer (textarea, max 500 chars)
- Submit answer
- Status changes to 'answered'
- Original asker is notified

**Question Display:**
- List of questions (newest first)
- Filter: pending/answered
- Each question shows: author, timestamp, status, answer (if available)
- Mark answer as helpful (thumbs up) – optional

**Auto-Close:**
- Questions auto-close after 7 days if no answer
- Status changes to 'closed'

---

## Notifications

**Notification Types:**
- `ask_answered`: "A local answered your question on [destination]"

**Notification Display:**
- Badge on Notifications icon in header (count of unread)
- Click icon to open notification panel
- List of notifications (newest first)
- Mark individual notification as read

**Notification Panel:**
- Show up to 10 most recent notifications
- "Load More" to paginate
- Each notification clickable → navigates to related destination

**Current Phase 1 Limitation:**
- Notifications checked on page load and periodic polling (every 30 seconds)
- Real-time WebSocket notifications deferred to Phase 2

---

## Images

**Image Upload:**
- Optional for posts and attractions
- Max 2MB, JPG or PNG format
- Client-side validation before upload (file type, size)
- Server-side validation in Supabase (duplicate check)

**Upload Flow:**
1. User selects file via file input
2. Client validates (format, size < 2MB)
3. If invalid, show error toast
4. If valid, show progress indicator
5. Upload to Supabase Storage (bucket: `travel-images`)
6. On success, get public URL and display preview
7. On failure, show retry/skip option

**File Naming Convention:**
```
{destinationID}_{type}_{timestamp}.{ext}
Example: 550e8400-e29b-41d4-a716-446655440000_post_1697000000000.jpg
```

**Storage Structure:**
- Supabase Storage bucket: `travel-images`
- Folder structure: `posts/{userID}/{postID}/`, `attractions/{destinationID}/`
- Public access (via CDN)

**Deletion:**
- Images deleted when post/attraction deleted
- User deletion: only profile images deleted, destination images retained

---

## Content Moderation

**Profanity Filter:**
- Applied to post content before submission
- Library: `bad-words` npm package (or similar)
- If profanity detected, block submission with message: "Your tip contains inappropriate language. Please revise."

**Content Reporting:**
- Report button on each post/question
- Opens modal with report reason dropdown: spam, offensive, dangerous, incorrect, other
- User can add optional comment
- Report stored in reports table (deferred schema)
- Phase 1: No automated action; reports logged for admin review

**Reports Table (for future use):**
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_by UUID REFERENCES users(id),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  reason VARCHAR(50),
  comment TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Error Handling

**Travel-Themed Error Messages:**
- "Pack your bags… but first answer all the questions so we can pick your adventure!" (missing quiz answers)
- "Oops! You don't have enough travel points to ask a local. Post a tip or review to earn some!" (insufficient credits)
- "Your tip got lost in transit! Add some text before sending it off." (empty post)
- "The photo didn't make it through customs. Try uploading again or skip for now." (image upload failure)
- "Our compass is spinning… we couldn't load this destination. Check your connection and try again." (API/network error)
- "You need a passport! Sign in before sharing your travel wisdom." (not logged in)
- "Looks like that gem is hiding today. Try again." (generic error)

**Error Presentation:**
- Toast notifications for most errors
- Modal for critical errors (auth, payment issues)
- Inline validation for form errors
- Auto-dismiss after 5 seconds (or manual dismiss)

**Logging:**
- Client-side errors logged to Sentry
- Server-side errors logged to Supabase logs
- Critical errors: email alert to admin

---

## Navigation & UI/UX Details

**Navigation Structure:**
- **Header:** Logo/Home, Navigation links (Home, Profile), Notifications bell, (Logout)
- **Footer:** About, Contact, Terms (on all pages except modals)
- **Main Navigation:** 
  - Home → Quiz page
  - Profile → User profile page
  - Notifications → Notification panel

**Page Structure:**
1. **Home Page:** 
   - Hero section with tagline "Explore the Unseen"
   - "Start Quiz" button
   - Optional: Featured destinations or testimonials

2. **Quiz Page:**
   - Multi-step form (4 steps)
   - Progress indicator
   - "Previous" / "Next" buttons
   - Step validation before advancing

3. **Quiz Results Page:**
   - 3 destination cards (grid on desktop, stack on mobile)
   - Each card: image, title, overview, "Why this matches you" (static)
   - "Retake Quiz" button
   - "Adjust Filters" option

4. **Destination Detail Page:**
   - Hero image
   - Title and country
   - Overview text
   - Save/Visit buttons
   - Key Attractions section (list, max 5 visible)
   - Add Experience button
   - Travel Info section (distance, budget, season, sustainability)
   - Community Tips section (3 visible, expandable)
   - Ask a Local section
   - Related questions/answers

5. **Profile Page:**
   - User header (username, country, interests, credits, reputation)
   - Saved Destinations grid
   - Visited Destinations grid
   - My Posts list
   - Logout button

**Responsive Breakpoints:**
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1024px+

**Mobile Considerations:**
- Stack layouts vertically
- Full-width buttons
- Touch-friendly spacing (min 44px tap targets)
- Bottom sheet modals instead of center modals
- Simplified navigation (hamburger menu optional)

---

## Seed Data Example

**Destination Object Structure:**
```json
{
  "name": "Kyoto, Japan",
  "country": "JP",
  "trip_style_tags": ["Cultural", "Relaxed"],
  "interest_tags": ["Culture", "Food", "History"],
  "overview": "Experience authentic Japanese culture in ancient temples and traditional gardens. Kyoto offers serene experiences away from Tokyo's hustle.",
  "key_attractions": [
    {
      "name": "Fushimi Inari Shrine",
      "description": "Iconic shrine with thousands of vermillion torii gates. Less crowded in early morning.",
      "image_url": "https://example.com/fushimi.jpg"
    },
    {
      "name": "Arashiyama Bamboo Grove",
      "description": "Serene bamboo forest. Visit outside peak hours for peaceful experience.",
      "image_url": null
    }
  ],
  "sustainability": "Medium",
  "best_season": "Spring, Autumn",
  "image_url": "https://example.com/kyoto.jpg",
  "active": true,
  "distance_km": 8000,
  "budget_category": "Medium"
}
```

**Seed Data Requirements:**
- 50–100 destinations
- Each with name, country, trip_style_tags, interest_tags, overview
- At least 2 key_attractions per destination (can be empty if unavailable)
- Sustainability level assigned (Low/Medium/High)
- Best season (or null if year-round)
- Image URL (or placeholder)

**Seeding Process:**
1. Create `seed-data.json` with all destinations
2. Create seed script: `scripts/seedDestinations.js`
3. Script connects to Supabase, reads JSON, bulk inserts destinations
4. Run: `node scripts/seedDestinations.js` during deployment setup

---

## Caching & Free APIs

**Destination Data Caching:**
- Destination queries cached client-side (Redux store)
- Cache invalidated on: new post submitted, destination updated
- Server-side caching: Supabase handles with HTTP cache headers (optional)

**Free APIs (Optional):**
- Wikidata for destination info (deferred to Phase 2)
- Wikivoyage for travel tips (deferred to Phase 2)
- Phase 1: Use seeded data only

**API Rate Limiting:**
- No rate limiting in Phase 1
- Supabase free tier: 500k API calls/month (sufficient for MVP)

---

## Testing Requirements

**Unit Tests:**
- `destinationMatcher.test.js`: Test quiz matching algorithm
  - Test scoring logic
  - Test filtering (budget, distance)
  - Test tie-breaking
  - Test edge cases (no matches, all match)

- `creditCalculator.test.js`: Test credit earning/spending
  - Tip post: +5 credits
  - Experience post: +10 credits
  - Ask local: -5 credits
  - Negative credit prevention

- `reputationTier.test.js`: Test tier calculation
  - 0–20: New Traveller
  - 21–50: Active Traveller
  - 51–75: Local
  - 76+: Local Expert

**Integration Tests:**
- `auth.integration.test.js`: Test signup, login, logout flows
  - User can signup with valid email/password
  - Duplicate email rejected
  - Duplicate username rejected
  - User can login after signup
  - Session persists on page reload
  - User can logout

- `posts.integration.test.js`: Test post creation and display
  - User can create tip post (+5 credits)
  - User can create review post (+5 credits)
  - User can create experience post (+10 credits)
  - Credits deducted/added correctly
  - Post appears on destination page
  - Can upload image with post
  - Character limit enforced (500)

- `credits.integration.test.js`: Test credit transactions
  - New user starts with 10 credits
  - Credit deduction blocks if insufficient
  - Credit transaction rollback on failure
  - Reputation tier updates after credit change
  - Multiple simultaneous posts don't cause race conditions

**Test Accounts (Pre-created for QA):**
| Account | Email | Password | Credits | Tier | Notes |
|---------|-------|----------|---------|------|-------|
| newuser | new@test.com | TestPass123! | 10 | New Traveller | Fresh signup |
| activeuser | active@test.com | TestPass123! | 35 | Active Traveller | Multiple posts |
| localexpert | expert@test.com | TestPass123! | 85 | Local Expert | Can answer questions |

---

## Deployment & Environment

**Environments:**
- **Development:** Local machine, local Supabase instance or dev Supabase project
- **Staging:** Heroku/Vercel staging deployment, Supabase staging database
- **Production:** Vercel/Netlify production deployment, Supabase production database

**Environment Variables:**
```
REACT_APP_SUPABASE_URL=https://[project-id].supabase.co
REACT_APP_SUPABASE_ANON_KEY=[anon-key]
REACT_APP_SUPABASE_STORAGE_BUCKET=travel-images
REACT_APP_API_TIMEOUT=10000
REACT_APP_NOTIFICATIONS_POLL_INTERVAL=30000
SENTRY_DSN=[sentry-project-url]
```

**Database Migrations:**
- Use Supabase migrations for schema changes
- Migrations stored in `supabase/migrations/` folder
- Run: `supabase db push` to apply migrations

**CI/CD Pipeline:**
- GitHub Actions triggered on push to main/staging branches
- Lint and test on every commit
- Build on merge to staging
- Deploy staging automatically
- Manual approval for production deployment
- Rollback: revert commit, push to main, redeploy

**Monitoring:**
- Supabase logs: check for API errors, database issues
- Sentry: track client-side errors
- Error alerts: email on critical failures
- Performance monitoring: track API response times

**Rollback Strategy:**
- Database: revert to latest backup snapshot (Supabase handles)
- Frontend: rollback to previous Vercel deployment
- Cache: clear Vercel cache after rollback

---

## Edge Cases & Rollback

**Credit Edge Cases:**
- User cannot have negative credits (business logic prevents)
- If post creation fails, credits are not deducted
- If post creation succeeds but credit update fails, use transaction rollback
- Multiple simultaneous credit updates: use database transactions and row locks

**Reputation Edge Cases:**
- Reputation only increases, never decreases
- Tier changes are immediate upon credit change
- Historical tier information not tracked

**User Data Edge Cases:**
- Duplicate username: rejected at signup
- Username change: deferred to Phase 2
- User deletion: cascades to all user data (posts, asks, saved/visited, notifications)
- Destination deletion: posts and asks remain but marked as inactive

**Destination Edge Cases:**
- Destination marked inactive: still visible in user's saved/visited/posts, hidden from quiz results
- Destination with no attractions: display "No attractions added yet"
- Destination with no posts: display "Be the first to share a tip!"
- Destination with no season data: display "Best time varies"

**Ask a Local Edge Cases:**
- User can ask multiple questions per destination
- Question with no answer after 7 days: auto-close to 'closed' status
- Local can only answer if they are in correct country AND have Local tier (51+)
- Question asker cannot see question in their own notification history

**Image Edge Cases:**
- Image upload fails: show retry button, allow post without image
- Image corrupted: reject with file validation error
- User deletion: profile images deleted, but images in posts remain for other users to see

**Transaction Rollback:**
```javascript
// Example: Post creation with credit transaction
async function createPost(userId, destinationId, postData) {
  const tx = await supabase.rpc('begin_transaction');
  
  try {
    // Create post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert([{ user_id: userId, destination_id: destinationId, ...postData }])
      .select();
    
    if (postError) throw postError;
    
    // Update credits
    const creditAmount = getCreditAmount(postData.type);
    const { error: creditError } = await supabase
      .from('users')
      .update({ credits: supabase.raw(`credits + ${creditAmount}`) })
      .eq('id', userId);
    
    if (creditError) throw creditError;
    
    // Recalculate reputation
    const { error: reputationError } = await supabase
      .rpc('recalculate_reputation', { user_id: userId });
    
    if (reputationError) throw reputationError;
    
    await supabase.rpc('commit_transaction');
    return post;
  } catch (error) {
    await supabase.rpc('rollback_transaction');
    throw error;
  }
}
```

---

## Implementation Notes

### Important Considerations

**State Management:**
- Use Redux Toolkit for complex state (credits, reputation, user)
- Use Context API for UI state (modals, notifications, theme)
- Avoid prop drilling through more than 2 levels

**Performance Optimization:**
- Lazy load destination cards with React.lazy()
- Paginate posts/notifications (10 per page initially)
- Cache quiz results in Redux (invalidate on logout)
- Use debounce for search inputs (deferred to Phase 2)

**Security:**
- Never store sensitive data in Redux (use secure HTTP-only cookies)
- Validate all inputs server-side (Supabase RLS policies)
- Use Supabase Row Level Security (RLS) to prevent unauthorized data access
- Sanitize user-generated content (especially in posts)

**Accessibility:**
- WCAG AA compliance
- Semantic HTML (use <button>, <header>, <nav>)
- ARIA labels for icon buttons
- Keyboard navigation for all interactive elements
- Alt text for all images

**Browser Support:**
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile: iOS Safari 12+, Chrome Android

**Known Limitations (Phase 1):**
- No real-time notifications (polling instead)
- No user-to-user messaging
- No advanced search/filtering
- No recommendation algorithm
- No offline support

### Common Pitfalls to Avoid

1. **Race Conditions:** Always use database transactions for multi-step operations
2. **State Inconsistency:** Keep Redux state in sync with database (refresh after mutations)
3. **Image Handling:** Always validate file size/type client-side AND server-side
4. **Error Recovery:** Provide users a way to retry failed operations
5. **Session Management:** Handle token expiry gracefully (silent refresh if possible)

### Debugging Tips

**Network Issues:**
- Use browser DevTools Network tab to inspect API calls
- Check Supabase logs in dashboard for server-side errors
- Use Postman to test API endpoints directly

**State Issues:**
- Use Redux DevTools to inspect state changes
- Add console.logs in reducers to track state mutations
- Use React DevTools Profiler to identify unnecessary re-renders

**Database Issues:**
- Use Supabase Studio SQL editor to test queries
- Check for proper indexes on frequently queried columns
- Monitor database performance in Supabase dashboard

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Oct 11, 2025 | Original spec |
| 2.0 | Oct 11, 2025 | Added learnings from Lovable prototype |
| 2.1 (Current) | Oct 11, 2025 | Complete rebuild spec with project structure, implementation notes |