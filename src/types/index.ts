// Core data types for the Uncharted travel app

export interface User {
  id: string;
  username: string;
  email: string;
  country: string;
  interests: string[];
  credits: number;
  reputation: number;
  created_at: string;
  updated_at: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  trip_style_tags: string[];
  interest_tags: string[];
  overview: string;
  key_attractions: Attraction[];
  sustainability: 'Low' | 'Medium' | 'High';
  best_season: string | null;
  image_url: string | null;
  active: boolean;
  distance_km: number | null;
  budget_category: 'Low' | 'Medium' | 'High' | null;
  created_at: string;
  updated_at: string;
}

export interface Attraction {
  name: string;
  description: string;
  image_url: string | null;
}

export interface Post {
  id: string;
  user_id: string;
  destination_id: string;
  type: 'tip' | 'review' | 'experience';
  content: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  user?: User;
  destination?: Destination;
}

export interface AskALocal {
  id: string;
  user_id: string;
  destination_id: string;
  question: string;
  answer: string | null;
  answered_by: string | null;
  status: 'pending' | 'answered' | 'closed';
  is_helpful: boolean | null;
  created_at: string;
  updated_at: string;
  // Joined data
  user?: User;
  destination?: Destination;
  answered_by_user?: User;
}

export interface SavedVisited {
  id: string;
  user_id: string;
  destination_id: string;
  type: 'saved' | 'visited';
  created_at: string;
  // Joined data
  destination?: Destination;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  message: string;
  related_id: string | null;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  related_id: string | null;
  status: 'pending' | 'completed' | 'failed' | 'reversed';
  created_at: string;
}

// Quiz and matching types
export interface QuizAnswers {
  tripStyle: string;
  interests: string[];
  budget: string;
  distance: string;
}

export interface QuizResult {
  destination: Destination;
  score: number;
  matchReason: string;
}

// Reputation tiers
export type ReputationTier = 'New Traveller' | 'Active Traveller' | 'Local' | 'Local Expert';

export interface ReputationInfo {
  tier: ReputationTier;
  credits: number;
  icon: string;
  color: string;
}

// API response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form types
export interface SignupForm {
  email: string;
  password: string;
  username: string;
  country: string;
  interests: string[];
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface PostForm {
  type: 'tip' | 'review' | 'experience';
  content: string;
  image?: File;
}

export interface AskLocalForm {
  question: string;
}

export interface AddExperienceForm {
  name: string;
  description: string;
  image?: File;
}

// Redux state types
export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  profile: User | null;
  credits: number;
  reputation: number;
  reputationTier: ReputationTier;
  savedDestinations: Destination[];
  visitedDestinations: Destination[];
  loading: boolean;
  error: string | null;
}

export interface NotificationsState {
  count: number;
  items: Notification[];
  isRead: boolean;
  loading: boolean;
  error: string | null;
}

export interface DestinationsState {
  currentDestinations: Destination[];
  filters: {
    tripStyle: string | null;
    interests: string[];
    budget: string | null;
    distance: string | null;
  };
  quizResults: QuizResult[];
  quizAnswers: QuizAnswers | null;
  loading: boolean;
  error: string | null;
}

export interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

// Service function types
export interface CreatePostData {
  userId: string;
  destinationId: string;
  type: 'tip' | 'review' | 'experience';
  content: string;
  imageFile?: File;
}

export interface CreateAskLocalData {
  destinationId: string;
  question: string;
}

export interface CreateExperienceData {
  destinationId: string;
  name: string;
  description: string;
  image?: File;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Constants
export const TRIP_STYLES = ['Adventure', 'Cultural', 'Relaxed', 'Nature', 'Food'] as const;
export const INTERESTS = ['Nature', 'Culture', 'Food', 'History', 'Adventure', 'Sustainability'] as const;
export const BUDGET_OPTIONS = ['Low', 'Medium', 'High'] as const;
export const DISTANCE_OPTIONS = ['Near', 'Medium', 'Far'] as const;
export const SUSTAINABILITY_LEVELS = ['Low', 'Medium', 'High'] as const;
export const POST_TYPES = ['tip', 'review', 'experience'] as const;
export const ASK_LOCAL_STATUS = ['pending', 'answered', 'closed'] as const;
export const CREDIT_TRANSACTION_STATUS = ['pending', 'completed', 'failed', 'reversed'] as const;




