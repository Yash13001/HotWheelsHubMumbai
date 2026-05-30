import { useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiSparkles, HiUserGroup } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";

export default function ConnectWithUs() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const socialLinks = [
    {
      icon: <FaInstagram />,
      label: "Instagram",
      href: "https://instagram.com/hotwheelshubmumbai",
      color: "#E1306C",
      followers: "12K+",
    },
    {
      icon: <FaYoutube />,
      label: "YouTube",
      href: "https://youtube.com/@hotwheelshubmumbai",
      color: "#FF0000",
      followers: "5K+",
    },
    {
      icon: <FaXTwitter />,
      label: "Twitter / X",
      href: "https://twitter.com/hotwheelshubmumbai",
      color: "#ffffff",
      followers: "3K+",
    },
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      href: "https://facebook.com/hotwheelshubmumbai",
      color: "#1877F2",
      followers: "8K+",
    },
  ];

  return (
    <section className="connect" id="connect">
      <div className="container">
        {/* Section Header */}
        <div className="connect__header reveal">
          <div className="section-label">
            <HiSparkles style={{ fontSize: "14px" }} />
            Stay Connected
          </div>
          <h2 className="section-title">
            Join The <span className="connect__highlight">Community</span>
          </h2>
          <p className="section-subtitle">
            Connect with Mumbai's most passionate Hot Wheels collectors. Get
            instant updates, exclusive drops, and be part of something special.
          </p>
        </div>

        {/* Main Connect Cards */}
        <div className="connect__cards reveal">
          {/* WhatsApp Card */}
          <a
            href="https://chat.whatsapp.com/your-group-link"
            target="_blank"
            rel="noopener noreferrer"
            className={`connect__card connect__card--whatsapp ${
              hoveredCard === "whatsapp" ? "connect__card--active" : ""
            }`}
            onMouseEnter={() => setHoveredCard("whatsapp")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="connect__card-glow connect__card-glow--whatsapp"></div>
            <div className="connect__card-particles">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="connect__particle"
                  style={{
                    "--delay": `${i * 0.5}s`,
                    "--x": `${Math.random() * 100}%`,
                    "--y": `${Math.random() * 100}%`,
                  }}
                ></span>
              ))}
            </div>
            <div className="connect__card-icon connect__card-icon--whatsapp">
              <FaWhatsapp />
            </div>
            <div className="connect__card-content">
              <h3 className="connect__card-title">Join WhatsApp Group</h3>
              <p className="connect__card-desc">
                Get instant alerts on new arrivals, flash deals & connect with
                fellow collectors in real-time.
              </p>
              <div className="connect__card-stats">
                <div className="connect__card-stat">
                  <HiUserGroup />
                  <span>2.4K+ Members</span>
                </div>
                <div className="connect__card-stat">
                  <MdVerified />
                  <span>Active Daily</span>
                </div>
              </div>
            </div>
            <div className="connect__card-action">
              <span>Join Now</span>
              <FaArrowRight />
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href="https://instagram.com/hotwheelshubmumbai"
            target="_blank"
            rel="noopener noreferrer"
            className={`connect__card connect__card--instagram ${
              hoveredCard === "instagram" ? "connect__card--active" : ""
            }`}
            onMouseEnter={() => setHoveredCard("instagram")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="connect__card-glow connect__card-glow--instagram"></div>
            <div className="connect__card-particles">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="connect__particle"
                  style={{
                    "--delay": `${i * 0.5}s`,
                    "--x": `${Math.random() * 100}%`,
                    "--y": `${Math.random() * 100}%`,
                  }}
                ></span>
              ))}
            </div>
            <div className="connect__card-icon connect__card-icon--instagram">
              <FaInstagram />
            </div>
            <div className="connect__card-content">
              <h3 className="connect__card-title">Follow on Instagram</h3>
              <p className="connect__card-desc">
                Behind-the-scenes unboxings, collection showcases & exclusive
                reels from India's top Hot Wheels store.
              </p>
              <div className="connect__card-stats">
                <div className="connect__card-stat">
                  <HiUserGroup />
                  <span>12K+ Followers</span>
                </div>
                <div className="connect__card-stat">
                  <MdVerified />
                  <span>Verified</span>
                </div>
              </div>
            </div>
            <div className="connect__card-action">
              <span>Follow Us</span>
              <FaArrowRight />
            </div>
          </a>
        </div>

        {/* About + Social Links Row */}
        <div className="connect__bottom reveal">
          {/* About HotWheels Hub Mumbai */}
          <div className="connect__about">
            <div className="connect__about-badge">
              <FaMapMarkerAlt />
              <span>Mumbai, India</span>
            </div>
            <h3 className="connect__about-title">HotWheels Hub Mumbai</h3>
            <p className="connect__about-desc">
              Mumbai's most trusted destination for premium Hot Wheels diecast
              collectibles. From rare Treasure Hunts to limited edition Super
              THs, we bring the world's finest die-cast models right to your
              doorstep. Every piece is 100% authentic, carefully curated, and
              shipped with collector-grade packaging.
            </p>
            <div className="connect__about-stats">
              <div className="connect__about-stat">
                <span className="connect__about-stat-number">5000+</span>
                <span className="connect__about-stat-label">Models Sold</span>
              </div>
              <div className="connect__about-stat-divider"></div>
              <div className="connect__about-stat">
                <span className="connect__about-stat-number">2.4K+</span>
                <span className="connect__about-stat-label">Happy Collectors</span>
              </div>
              <div className="connect__about-stat-divider"></div>
              <div className="connect__about-stat">
                <span className="connect__about-stat-number">100%</span>
                <span className="connect__about-stat-label">Authentic</span>
              </div>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="connect__socials">
            <h4 className="connect__socials-title">Find Us Everywhere</h4>
            <div className="connect__socials-grid">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect__social-card"
                  style={{ "--accent": social.color }}
                >
                  <div className="connect__social-icon">{social.icon}</div>
                  <div className="connect__social-info">
                    <span className="connect__social-name">{social.label}</span>
                    <span className="connect__social-followers">
                      {social.followers} Followers
                    </span>
                  </div>
                  <FaArrowRight className="connect__social-arrow" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
