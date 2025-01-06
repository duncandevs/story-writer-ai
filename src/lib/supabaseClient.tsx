// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and API key
const SUPABASE_URL = process.env['NEXT_PUBLIC_SUPABASE_PROJECT_URL'] || "";
const SUPABASE_ANON_KEY = process.env['NEXT_PUBLIC_SUPABASE_API_KEY'] || "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
