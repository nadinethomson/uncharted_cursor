// Simple Jest setup for unit tests
const { createClient } = require('@supabase/supabase-js');

// Mock Supabase for tests
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn()
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null, error: null }))
        }))
      }))
    }))
  }))
}));

// Mock environment variables
process.env.REACT_APP_SUPABASE_URL = 'https://test-project.supabase.co';
process.env.REACT_APP_SUPABASE_ANON_KEY = 'test-anon-key';