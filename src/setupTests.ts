// Jest setup for testing
import '@testing-library/jest-dom';

// Mock environment variables for tests
process.env.REACT_APP_SUPABASE_URL = 'https://test-project.supabase.co';
process.env.REACT_APP_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.REACT_APP_SUPABASE_STORAGE_BUCKET = 'travel-images';

// Mock console methods to reduce noise in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillReceiveProps') ||
       args[0].includes('componentWillMount'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});



