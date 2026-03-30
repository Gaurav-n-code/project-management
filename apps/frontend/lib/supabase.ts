// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yipkmqovncyjtscfubsb.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcGttcW92bmN5anRzY2Z1YnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NDA4MzAsImV4cCI6MjA5MDQxNjgzMH0.BuPb9rhfJQrS6R9JI6xpCqGeJOlgA_wmQGZq7VYR2Tw'
);