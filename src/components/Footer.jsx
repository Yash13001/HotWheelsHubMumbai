import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Subscribe logic
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <a href="#" className="navbar__brand">
              <div className="navbar__logo-icon">HW</div>
              <div className="navbar__brand-text">
                HotWheels<span>Hub</span>
              </div>
            </a>
            <p className="footer__brand-desc">
              India's premier destination for premium diecast collectibles.
              Every model authenticated, graded, and delivered with
              collector-grade packaging.
            </p>
          </div>

          <div>
            <h4 className="footer__heading">Collections</h4>
            <ul className="footer__links">
              <li>
                <a href="#" className="footer__link">
                  Supercars
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  JDM Legends
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Vintage Classics
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Limited Editions
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer__heading">Support</h4>
            <ul className="footer__links">
              <li>
                <a href="#" className="footer__link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Authentication
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer__heading">Company</h4>
            <ul className="footer__links">
              <li>
                <a href="#" className="footer__link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer__heading">Stay Connected</h4>
            <p className="footer__newsletter-desc">
              Get notified about exclusive drops and collector news.
            </p>
            <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="footer__newsletter-input"
                placeholder="Your email"
                aria-label="Email address"
              />
              <button type="submit" className="footer__newsletter-btn">
                Subscribe
              </button>
            </form>
            <div className="footer__socials">
              <a href="https://instagram.com/hotwheelshubmumbai" className="footer__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/hotwheelshubmumbai" className="footer__social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
              <a href="https://youtube.com/@hotwheelshubmumbai" className="footer__social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
              <a href="https://facebook.com/hotwheelshubmumbai" className="footer__social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://chat.whatsapp.com/your-group-link" className="footer__social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 HotWheels Hub Mumbai. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">
              Privacy Policy
            </a>
            <a href="#" className="footer__bottom-link">
              Terms of Service
            </a>
            <a href="#" className="footer__bottom-link">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
