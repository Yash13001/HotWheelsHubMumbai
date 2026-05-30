export default function About() {
  return (
    <div style={{ paddingTop: "120px", minHeight: "100vh" }}>
      <div className="container">
        <div className="section-label reveal" style={{ marginBottom: "16px" }}>
          Our Story
        </div>
        <h1 className="section-title reveal" style={{ marginBottom: "48px" }}>
          About Us
        </h1>
        
        <div className="reveal" style={{ maxWidth: "800px", marginBottom: "64px" }}>
          <p className="section-subtitle" style={{ fontSize: "1.2rem", marginBottom: "24px" }}>
            Welcome to HotWheels Hub Mumbai, India's premier destination for premium diecast collectibles. We were born out of a profound passion for automotive excellence in miniature form.
          </p>
          <p className="section-subtitle" style={{ marginBottom: "24px" }}>
            Every model in our curated catalog is authenticated, graded, and delivered with collector-grade packaging. We know that to a true collector, a diecast is more than just a toy—it's a piece of history, an engineering marvel, and a work of art. That's why we source only the most exclusive, limited-edition models from around the globe.
          </p>
          <p className="section-subtitle" style={{ marginBottom: "48px" }}>
            Whether you are hunting for that elusive JDM legend, a vintage American muscle classic, or a state-of-the-art European supercar, our mission is to bring the world's rarest models straight to your showcase.
          </p>

          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", marginBottom: "24px" }}>Join Our Community</h3>
          <div className="footer__socials" style={{ display: "flex", gap: "16px" }}>
            <a href="#" className="footer__social-link" aria-label="Instagram" style={{ width: "48px", height: "48px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="footer__social-link" aria-label="Twitter" style={{ width: "48px", height: "48px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" className="footer__social-link" aria-label="YouTube" style={{ width: "48px", height: "48px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>
            <a href="#" className="footer__social-link" aria-label="Facebook" style={{ width: "48px", height: "48px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
