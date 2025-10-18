// Quiz and app constants
export const TRIP_STYLES = [
  { value: 'Adventure', label: 'Adventure', description: 'Thrilling experiences and outdoor activities' },
  { value: 'Cultural', label: 'Cultural', description: 'Museums, history, and local traditions' },
  { value: 'Relaxed', label: 'Relaxed', description: 'Peaceful retreats and leisurely pace' },
  { value: 'Nature', label: 'Nature', description: 'Natural landscapes and wildlife' },
  { value: 'Food', label: 'Food', description: 'Culinary experiences and local cuisine' }
] as const;

export const INTERESTS = [
  { value: 'Nature', label: 'Nature', icon: '🌿' },
  { value: 'Culture', label: 'Culture', icon: '🏛️' },
  { value: 'Food', label: 'Food', icon: '🍽️' },
  { value: 'History', label: 'History', icon: '📚' },
  { value: 'Adventure', label: 'Adventure', icon: '⛰️' },
  { value: 'Sustainability', label: 'Sustainability', icon: '🌱' }
] as const;

export const BUDGET_OPTIONS = [
  { value: 'Low', label: 'Low Budget', description: 'Budget-friendly options', icon: '💰' },
  { value: 'Medium', label: 'Medium Budget', description: 'Moderate spending', icon: '💳' },
  { value: 'High', label: 'High Budget', description: 'Premium experiences', icon: '💎' }
] as const;

export const DISTANCE_OPTIONS = [
  { value: 'Near', label: 'Near (<100km)', description: 'Close to home', icon: '🏠' },
  { value: 'Medium', label: 'Medium (100–500km)', description: 'Regional travel', icon: '🚗' },
  { value: 'Far', label: 'Far (500+km)', description: 'Long-distance travel', icon: '✈️' }
] as const;

export const SUSTAINABILITY_LEVELS = ['Low', 'Medium', 'High'] as const;
export const POST_TYPES = ['tip', 'review', 'experience'] as const;
export const ASK_LOCAL_STATUS = ['pending', 'answered', 'closed'] as const;
export const CREDIT_TRANSACTION_STATUS = ['pending', 'completed', 'failed', 'reversed'] as const;

// Quiz step configuration
export const QUIZ_STEPS = [
  {
    id: 1,
    title: 'Trip Style',
    description: 'What kind of experience are you looking for?',
    type: 'single-select'
  },
  {
    id: 2,
    title: 'Interests',
    description: 'What interests you most? (Select all that apply)',
    type: 'multi-select',
    minSelections: 1
  },
  {
    id: 3,
    title: 'Budget',
    description: 'What\'s your budget range?',
    type: 'single-select'
  },
  {
    id: 4,
    title: 'Distance',
    description: 'How far are you willing to travel?',
    type: 'single-select'
  }
] as const;

// Error messages (travel-themed)
export const ERROR_MESSAGES = {
  QUIZ_INCOMPLETE: 'Pack your bags… but first answer all the questions so we can pick your adventure!',
  INSUFFICIENT_CREDITS: 'Oops! You don\'t have enough travel points to ask a local. Post a tip or review to earn some!',
  EMPTY_POST: 'Your tip got lost in transit! Add some text before sending it off.',
  IMAGE_UPLOAD_FAILED: 'The photo didn\'t make it through customs. Try uploading again or skip for now.',
  NETWORK_ERROR: 'Our compass is spinning… we couldn\'t load this destination. Check your connection and try again.',
  NOT_LOGGED_IN: 'You need a passport! Sign in before sharing your travel wisdom.',
  GENERIC_ERROR: 'Looks like that gem is hiding today. Try again.',
  DESTINATION_NOT_FOUND: 'This destination seems to have wandered off the map. Try exploring somewhere else!',
  POST_CREATION_FAILED: 'Your travel story got lost in the mail. Please try sharing it again.',
  INVALID_CREDENTIALS: 'Wrong coordinates! Check your email and password.',
  USERNAME_TAKEN: 'That username is already on someone\'s passport. Try a different one.',
  EMAIL_TAKEN: 'This email is already registered in our travel logs.',
  WEAK_PASSWORD: 'Your password needs to be stronger than a flimsy suitcase. Add some numbers and special characters.',
  INVALID_EMAIL: 'That doesn\'t look like a valid email address. Check your spelling.',
  FILE_TOO_LARGE: 'That image is too big for our luggage! Please choose a smaller file (max 2MB).',
  INVALID_FILE_TYPE: 'We only accept JPG and PNG images. Please choose a different file.',
  PROFANITY_DETECTED: 'Your tip contains inappropriate language. Please revise and try again.',
  QUESTION_TOO_LONG: 'Your question is too long for our travel guide. Please keep it under 300 characters.',
  CONTENT_TOO_LONG: 'Your message is too long for our postcard. Please keep it under 500 characters.',
  // Additional error messages for common scenarios
  LOADING_FAILED: 'Our travel guide got lost! Please refresh and try again.',
  SAVE_FAILED: 'Couldn\'t save that to your travel journal. Please try again.',
  DELETE_FAILED: 'Couldn\'t remove that from your travel log. Please try again.',
  UPDATE_FAILED: 'Couldn\'t update your travel notes. Please try again.',
  AUTH_FAILED: 'Your travel credentials didn\'t check out. Please try again.',
  SESSION_EXPIRED: 'Your travel pass has expired. Please sign in again.',
  PERMISSION_DENIED: 'You don\'t have permission for this travel action.',
  RATE_LIMITED: 'You\'re moving too fast! Please slow down and try again in a moment.',
  SERVER_ERROR: 'Our travel servers are having a rest day. Please try again later.',
  VALIDATION_ERROR: 'Please check your travel details and try again.',
  DUPLICATE_ENTRY: 'This entry already exists in your travel log.',
  INVALID_INPUT: 'That doesn\'t look like valid travel information. Please check and try again.'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  POST_CREATED: 'Your travel tip has been shared with fellow adventurers!',
  QUESTION_POSTED: 'Question posted! Local travelers can now reply.',
  DESTINATION_SAVED: 'Destination added to your travel wishlist!',
  DESTINATION_VISITED: 'Added to your travel memories!',
  EXPERIENCE_ADDED: 'New attraction added to the destination!',
  PROFILE_UPDATED: 'Your travel profile has been updated!',
  LOGIN_SUCCESS: 'Welcome back, fellow traveler!',
  SIGNUP_SUCCESS: 'Welcome to the Uncharted community!',
  LOGOUT_SUCCESS: 'Safe travels! See you on your next adventure.'
} as const;

/**
 * Maps error types to travel-themed error messages
 * @param errorType - The type of error
 * @param fallbackMessage - Fallback message if no specific mapping exists
 * @returns Travel-themed error message
 */
export function getTravelErrorMessage(errorType: string, fallbackMessage?: string): string {
  const errorMappings: Record<string, string> = {
    // Network and loading errors
    'network': ERROR_MESSAGES.NETWORK_ERROR,
    'loading': ERROR_MESSAGES.LOADING_FAILED,
    'fetch': ERROR_MESSAGES.LOADING_FAILED,
    'timeout': ERROR_MESSAGES.NETWORK_ERROR,
    
    // Authentication errors
    'auth': ERROR_MESSAGES.AUTH_FAILED,
    'login': ERROR_MESSAGES.INVALID_CREDENTIALS,
    'signup': ERROR_MESSAGES.AUTH_FAILED,
    'session': ERROR_MESSAGES.SESSION_EXPIRED,
    'permission': ERROR_MESSAGES.PERMISSION_DENIED,
    'unauthorized': ERROR_MESSAGES.NOT_LOGGED_IN,
    
    // Content errors
    'post': ERROR_MESSAGES.POST_CREATION_FAILED,
    'create': ERROR_MESSAGES.POST_CREATION_FAILED,
    'save': ERROR_MESSAGES.SAVE_FAILED,
    'update': ERROR_MESSAGES.UPDATE_FAILED,
    'delete': ERROR_MESSAGES.DELETE_FAILED,
    'upload': ERROR_MESSAGES.IMAGE_UPLOAD_FAILED,
    
    // Validation errors
    'validation': ERROR_MESSAGES.VALIDATION_ERROR,
    'invalid': ERROR_MESSAGES.INVALID_INPUT,
    'required': ERROR_MESSAGES.VALIDATION_ERROR,
    'format': ERROR_MESSAGES.VALIDATION_ERROR,
    
    // Server errors
    'server': ERROR_MESSAGES.SERVER_ERROR,
    'internal': ERROR_MESSAGES.SERVER_ERROR,
    'database': ERROR_MESSAGES.SERVER_ERROR,
    'rate-limit': ERROR_MESSAGES.RATE_LIMITED,
    
    // Not found errors
    'not-found': ERROR_MESSAGES.DESTINATION_NOT_FOUND,
    'missing': ERROR_MESSAGES.DESTINATION_NOT_FOUND,
    
    // Duplicate errors
    'duplicate': ERROR_MESSAGES.DUPLICATE_ENTRY,
    'exists': ERROR_MESSAGES.DUPLICATE_ENTRY,
    'taken': ERROR_MESSAGES.USERNAME_TAKEN,
    
    // Generic fallback
    'generic': ERROR_MESSAGES.GENERIC_ERROR,
    'unknown': ERROR_MESSAGES.GENERIC_ERROR
  };

  // Try to find a specific mapping
  const lowerErrorType = errorType.toLowerCase();
  for (const [key, message] of Object.entries(errorMappings)) {
    if (lowerErrorType.includes(key)) {
      return message;
    }
  }

  // Return fallback or generic message
  return fallbackMessage || ERROR_MESSAGES.GENERIC_ERROR;
}

/**
 * Gets a travel-themed error message based on error content
 * @param error - Error object or string
 * @returns Travel-themed error message
 */
export function getErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return getTravelErrorMessage(error);
  }
  
  if (error?.message) {
    return getTravelErrorMessage(error.message);
  }
  
  if (error?.code) {
    return getTravelErrorMessage(error.code);
  }
  
  return ERROR_MESSAGES.GENERIC_ERROR;
}

