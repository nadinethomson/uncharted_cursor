import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we have real Supabase credentials
const hasRealCredentials = process.env.REACT_APP_SUPABASE_URL && 
  process.env.REACT_APP_SUPABASE_ANON_KEY &&
  process.env.REACT_APP_SUPABASE_URL.startsWith('https://') && 
  process.env.REACT_APP_SUPABASE_URL.includes('.supabase.co') &&
  process.env.REACT_APP_SUPABASE_ANON_KEY.length > 50;

if (!hasRealCredentials) {
  console.warn('⚠️ No valid Supabase credentials found. App will use placeholder values.');
  console.warn('📝 To enable real authentication, create a .env file with your Supabase credentials.');
  console.warn('Expected format: REACT_APP_SUPABASE_URL=https://your-project.supabase.co');
}

// Always create a real Supabase client (it will fail gracefully if credentials are invalid)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});


// Database types (these should match your Supabase schema)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          country: string;
          interests: string[];
          credits: number;
          reputation: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          email: string;
          country: string;
          interests?: string[];
          credits?: number;
          reputation?: number;
        };
        Update: {
          username?: string;
          email?: string;
          country?: string;
          interests?: string[];
          credits?: number;
          reputation?: number;
          updated_at?: string;
        };
      };
      destinations: {
        Row: {
          id: string;
          name: string;
          country: string;
          trip_style_tags: string[];
          interest_tags: string[];
          overview: string;
          key_attractions: any[];
          sustainability: string;
          best_season: string | null;
          image_url: string | null;
          active: boolean;
          distance_km: number | null;
          budget_category: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          country: string;
          trip_style_tags: string[];
          interest_tags: string[];
          overview: string;
          key_attractions?: any[];
          sustainability: string;
          best_season?: string | null;
          image_url?: string | null;
          active?: boolean;
          distance_km?: number | null;
          budget_category?: string | null;
        };
        Update: {
          name?: string;
          country?: string;
          trip_style_tags?: string[];
          interest_tags?: string[];
          overview?: string;
          key_attractions?: any[];
          sustainability?: string;
          best_season?: string | null;
          image_url?: string | null;
          active?: boolean;
          distance_km?: number | null;
          budget_category?: string | null;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          destination_id: string;
          type: string;
          content: string;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          destination_id: string;
          type: string;
          content: string;
          image_url?: string | null;
        };
        Update: {
          type?: string;
          content?: string;
          image_url?: string | null;
          updated_at?: string;
        };
      };
      ask_a_local: {
        Row: {
          id: string;
          user_id: string;
          destination_id: string;
          question: string;
          answer: string | null;
          answered_by: string | null;
          status: string;
          is_helpful: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          destination_id: string;
          question: string;
        };
        Update: {
          answer?: string | null;
          answered_by?: string | null;
          status?: string;
          is_helpful?: boolean | null;
          updated_at?: string;
        };
      };
      saved_visited: {
        Row: {
          id: string;
          user_id: string;
          destination_id: string;
          type: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          destination_id: string;
          type: string;
        };
        Update: {};
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          message: string;
          related_id: string | null;
          is_read: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          type: string;
          message: string;
          related_id?: string | null;
        };
        Update: {
          is_read?: boolean;
          updated_at?: string;
        };
      };
      credit_transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          type: string;
          related_id: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          amount: number;
          type: string;
          related_id?: string | null;
          status?: string;
        };
        Update: {
          status?: string;
        };
      };
    };
  };
}



