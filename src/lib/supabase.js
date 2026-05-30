import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qqunxtnclungumpcunsr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxdW54dG5jbHVuZ3VtcGN1bnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjY5NDUsImV4cCI6MjA5NTEwMjk0NX0.jDhsrPE1sEAcoA9H18VCbJOSZIVAs7Q5fmeQZosbFcM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const PREMIUM_PLACEHOLDER_IMAGE = "/images/product_1.png";

