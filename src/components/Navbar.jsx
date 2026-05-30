import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <div className="navbar__inner">
          <Link to="/" className="navbar__brand">
            <div className="navbar__logo-icon">HW</div>
            <div className="navbar__brand-text">
              HotWheels<span>Hub</span>
            </div>
          </Link>

          <ul className="navbar__nav">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collectibles"
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                Collectibles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                About
              </NavLink>
            </li>
          </ul>

          <div className="navbar__actions">
            <button className="navbar__icon-btn" aria-label="Search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button className="navbar__icon-btn" aria-label="Wishlist">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
            <button
              className="navbar__icon-btn navbar__cart-badge"
              aria-label="Cart"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </button>
            <a href="#" className="navbar__cta">
              Join Club
            </a>

            <button
              className="navbar__hamburger"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span
                style={
                  mobileMenuOpen
                    ? { transform: "rotate(45deg) translate(5px, 5px)" }
                    : {}
                }
              ></span>
              <span style={mobileMenuOpen ? { opacity: 0 } : {}}></span>
              <span
                style={
                  mobileMenuOpen
                    ? { transform: "rotate(-45deg) translate(5px, -5px)" }
                    : {}
                }
              ></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-mobile-link" : "")}
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active-mobile-link" : "")}
          onClick={() => setMobileMenuOpen(false)}
        >
          Shop
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? "active-mobile-link" : "")}
          onClick={() => setMobileMenuOpen(false)}
        >
          Categories
        </NavLink>
        <NavLink
          to="/collectibles"
          className={({ isActive }) => (isActive ? "active-mobile-link" : "")}
          onClick={() => setMobileMenuOpen(false)}
        >
          Collectibles
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-mobile-link" : "")}
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </NavLink>
        <a href="#membership" onClick={() => setMobileMenuOpen(false)}>
          Join Club
        </a>
      </div>
    </>
  );
}
