import { createClient } from "@supabase/supabase-js";

export type Testimonial = {
  id: string;
  name: string;
  content: string;
  rating: number;
  created_at: string;
};

export type Lead = {
  name: string;
  email: string;
  message: string;
};

let _supabase: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    if (!url || !key) return null;
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export { getSupabase };
