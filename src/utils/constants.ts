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
  CONTENT_TOO_LONG: 'Your message is too long for our postcard. Please keep it under 500 characters.'
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

