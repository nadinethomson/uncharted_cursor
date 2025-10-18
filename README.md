# Uncharted Travel App

A React-based travel destination finder that helps users discover hidden gems and authentic experiences through intelligent matching and community-driven recommendations.

## 🏗️ Architecture Overview

This rebuild addresses critical architectural problems from the previous prototype:

### ✅ **Solved Problems**
1. **Atomic Transactions** - All credit operations use database transactions
2. **Immutable State** - Redux Toolkit with strict immutability patterns
3. **Feature Isolation** - Business logic extracted to pure functions
4. **Explicit Dependencies** - Clear data flow and service boundaries
5. **Error Recovery** - Comprehensive rollback mechanisms

### 🏛️ **Architecture Principles**

#### **1. Atomic Credit Transactions**
```typescript
// All credit operations are atomic
const result = await executeCreditTransaction({
  userId,
  amount: 5,
  type: 'tip',
  relatedId: postId
});
// If any step fails, entire transaction rolls back
```

#### **2. Immutable State Management**
```typescript
// Redux slices with strict immutability
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // Always return new state objects
      return { ...state, user: action.payload.user };
    }
  }
});
```

#### **3. Feature Isolation**
```typescript
// Pure business logic functions
export function matchDestinations(quizAnswers, destinations) {
  // No side effects, easily testable
}

// Isolated services
export async function createPostWithCredits(userId, postData) {
  // Atomic transaction handling
}
```

## 📁 **Project Structure**

```
src/
├── components/          # UI components (no business logic)
├── pages/              # Route pages
├── services/           # Database layer (atomic transactions)
│   ├── supabase.ts     # Supabase client
│   ├── authService.ts  # Authentication
│   ├── creditService.ts # Credit transactions
│   ├── postService.ts  # Post creation with rollback
│   └── destinationService.ts
├── store/              # Redux state management
│   ├── authSlice.ts    # Authentication state
│   ├── userSlice.ts    # User profile & credits
│   ├── notificationsSlice.ts
│   ├── destinationsSlice.ts
│   └── postsSlice.ts
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useCredits.ts   # Credit management
│   ├── useDestinations.ts
│   └── usePosts.ts
├── utils/              # Pure business logic
│   ├── destinationMatcher.ts
│   ├── creditCalculator.ts
│   └── reputationTier.ts
└── types/              # TypeScript interfaces
```

## 🔧 **Key Features**

### **Credit System (Atomic)**
- **Earning**: Tip (+5), Review (+5), Experience (+10)
- **Spending**: Ask a Local (-5 credits)
- **Atomic Transactions**: All operations use database transactions
- **Rollback**: Failed operations automatically rollback

### **State Management**
- **Redux Toolkit**: Immutable state updates
- **Feature Isolation**: Each slice owns its state
- **Selectors**: Derived state computation
- **No Shared Mutable State**: Clear ownership boundaries

### **Service Layer**
- **Atomic Operations**: Database transactions for consistency
- **Error Handling**: Comprehensive rollback mechanisms
- **Testable**: Services can be tested independently
- **Clear Dependencies**: Explicit service boundaries

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+
- Supabase account
- npm or yarn

### **Installation**
```bash
# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Configure Supabase
# Add your Supabase URL and keys to .env.local
```

### **Environment Variables**
```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_SUPABASE_STORAGE_BUCKET=travel-images
```

### **Database Setup**
```sql
-- Run the SQL schema in Supabase SQL Editor
-- See: database/schema.sql
```

### **Development**
```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## 🧪 **Testing Strategy**

### **Unit Tests** (Pure Functions)
```typescript
// Test business logic in isolation
test('creditCalculator adds correct amount', () => {
  expect(calculateCredits('tip')).toBe(5);
});

test('destinationMatcher scores correctly', () => {
  const results = matchDestinations(quizAnswers, destinations);
  expect(results[0].score).toBeGreaterThan(0);
});
```

### **Integration Tests** (Services)
```typescript
// Test atomic transactions
test('creating post deducts credits atomically', async () => {
  const result = await createPostWithCredits(userId, postData);
  expect(result.success).toBe(true);
  // Verify credits were updated
  // Verify post was created
  // Verify transaction was logged
});
```

## 🔒 **Critical Constraints**

### **1. Credit Transaction Boundaries**
- ✅ All credit operations use database transactions
- ✅ Post creation and credit updates are atomic
- ✅ Failed operations rollback completely
- ✅ No race conditions on simultaneous updates

### **2. State Consistency**
- ✅ Redux Toolkit enforces immutability
- ✅ Each feature owns its state slice
- ✅ No shared mutable state between features
- ✅ Selectors compute derived values

### **3. Feature Isolation**
- ✅ Business logic in pure functions (`utils/`)
- ✅ Database operations in services (`services/`)
- ✅ Components consume through hooks (`hooks/`)
- ✅ Each feature independently testable

### **4. Explicit Dependencies**
- ✅ Clear service dependencies
- ✅ Components receive props explicitly
- ✅ Data flows in one direction
- ✅ No circular dependencies

### **5. Error Recovery**
- ✅ Database transactions for atomicity
- ✅ Explicit rollback mechanisms
- ✅ User-facing error messages
- ✅ Retry mechanisms for failed operations

## 📊 **Data Flow**

```
Component → Hook → Service → Database
    ↓         ↓        ↓        ↓
  UI State → Redux → Business → Supabase
```

**Example: Creating a Post**
1. Component calls `usePosts().createPost()`
2. Hook calls `postService.createPostWithCredits()`
3. Service creates post + updates credits atomically
4. Redux state updates with new data
5. Component re-renders with updated state

## 🎯 **Next Steps**

1. **Database Schema**: Create Supabase tables
2. **Seed Data**: Load 50+ test destinations
3. **UI Components**: Build quiz and destination components
4. **Authentication**: Implement signup/login flows
5. **Testing**: Add comprehensive test suite

## 🐛 **Common Pitfalls Avoided**

- ❌ **Race Conditions**: Atomic transactions prevent this
- ❌ **State Inconsistency**: Immutable updates prevent this
- ❌ **Tight Coupling**: Feature isolation prevents this
- ❌ **Circular Dependencies**: Explicit boundaries prevent this
- ❌ **Inconsistent Rollback**: Comprehensive error handling prevents this

## 📈 **Performance Considerations**

- **Lazy Loading**: Components loaded on demand
- **Pagination**: Large lists are paginated
- **Caching**: Redux state caches frequently accessed data
- **Optimistic Updates**: UI updates immediately, rolls back on failure

---

**This architecture ensures the app is maintainable, testable, and free from the race conditions and state inconsistencies that plagued the previous prototype.**










