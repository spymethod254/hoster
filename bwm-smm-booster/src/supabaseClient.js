import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ugacfuygsytixbjmwdcq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnYWNmdXlnc3l0aXhiam13ZGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MjUxMDksImV4cCI6MjEwNDMwMTEwOX0.RY43D4eVj1bIDBaTZAm7NmoOYSvXf6jyqFW7dukaijI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);