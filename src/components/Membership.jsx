export default function Membership() {
  return (
    <section className="membership" id="membership">
      <div className="container">
        <div className="membership__inner reveal">
          <div className="membership__glow"></div>
          <div className="membership__content">
            <div className="membership__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="section-label">Exclusive Access</div>
            <h2 className="membership__title">
              Join The Inner Circle of <span>Elite Collectors</span>
            </h2>
            <p className="membership__desc">
              Get priority access to limited drops, member-only pricing, and
              invitations to exclusive collector events worldwide.
            </p>
            <div className="membership__benefits">
              <div className="membership__benefit">
                <div className="membership__benefit-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                Early access to every limited edition drop
              </div>
              <div className="membership__benefit">
                <div className="membership__benefit-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                Members-only 15% discount on all orders
              </div>
              <div className="membership__benefit">
                <div className="membership__benefit-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                Free worldwide insured shipping
              </div>
              <div className="membership__benefit">
                <div className="membership__benefit-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                VIP invitations to collector meetups
              </div>
            </div>
            <a href="#" className="btn-primary">
              Become a Member
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="membership__testimonial">
            <div className="membership__quote-mark">"</div>
            <p className="membership__quote">
              HotWheels Hub has completely transformed my collecting experience.
              The member drops alone are worth it — I've secured pieces that
              tripled in value within months. The curation is impeccable.
            </p>
            <div className="membership__divider"></div>
            <div className="membership__reviewer">
              <div className="membership__reviewer-avatar">RK</div>
              <div>
                <div className="membership__reviewer-name">Rajesh Khanna</div>
                <div className="membership__reviewer-title">
                  Founding Member · Mumbai
                </div>
              </div>
            </div>
            <div className="membership__trust">
              <div className="membership__trust-item">
                <div className="membership__trust-number">4.9</div>
                <div className="membership__trust-label">Rating</div>
              </div>
              <div className="membership__trust-item">
                <div className="membership__trust-number">2.4K</div>
                <div className="membership__trust-label">Members</div>
              </div>
              <div className="membership__trust-item">
                <div className="membership__trust-number">98%</div>
                <div className="membership__trust-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
