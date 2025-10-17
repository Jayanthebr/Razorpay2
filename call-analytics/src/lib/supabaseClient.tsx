import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hjnsloeukxeyvcoachxm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqbnNsb2V1a3hleXZjb2FjaHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjkxNDAsImV4cCI6MjA3NjA0NTE0MH0.MNatH1ArvNHNB-7DxiTKAZarIgWztbMSgVNpy4l60o4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
