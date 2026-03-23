import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabaseUrl = (url && String(url).trim()) || "https://qiwphwptypshrlhxqqzu.supabase.co";
const supabaseKey =
  (key && String(key).trim()) ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "";
const anonKey =
  supabaseKey ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpd3Bod3B0eXBzaHJsaHhxcXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NjQ4OTcsImV4cCI6MjA4OTU0MDg5N30._tATVdCpIbio0qMfBiEoxiivI8B8MAJ4eBRy8hQjL2A";
export const supabase = createClient(supabaseUrl, anonKey, {
  auth: { storage: localStorage, persistSession: true, autoRefreshToken: true },
});
