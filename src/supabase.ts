import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://bbpsttshxulrekwvjlao.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicHN0dHNoeHVscmVrd3ZqbGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MDE0OTMsImV4cCI6MjA5MDQ3NzQ5M30.cH6mHnuOH5y2AXDAJMNwMKTXpcfbkRVntqDIRBl7Lug';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
