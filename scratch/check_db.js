const supabaseUrl = "https://qqunxtnclungumpcunsr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxdW54dG5jbHVuZ3VtcGN1bnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjY5NDUsImV4cCI6MjA5NTEwMjk0NX0.jDhsrPE1sEAcoA9H18VCbJOSZIVAs7Q5fmeQZosbFcM";

async function check() {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/orders?select=*&limit=1`, {
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Single Order Row Structure:", data);
  } catch (err) {
    console.error("Error fetching order row:", err);
  }
}

check();
