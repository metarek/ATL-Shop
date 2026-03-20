import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://xsnapcmvqsojpjjjoigo.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVydnlqdWNhb3hwdWtjZ3BwcXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzY5MDMsImV4cCI6MjA4OTE1MjkwM30.PXv42dA8XBf6oKn6w7b983XYdI6youKLxU-T63SVPDw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
