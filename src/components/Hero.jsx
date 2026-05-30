import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setParallax({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__bg-effects">
        <div
          className="hero__spotlight hero__spotlight--1"
          style={{
            transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)`,
          }}
        ></div>
        <div
          className="hero__spotlight hero__spotlight--2"
          style={{
            transform: `translate(${parallax.x * 1.0}px, ${parallax.y * 1.0}px)`,
          }}
        ></div>
        <div
          className="hero__spotlight hero__spotlight--3"
          style={{
            transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)`,
          }}
        ></div>
        <div className="hero__grid-overlay"></div>
        <div className="hero__particles">
          <div className="hero__particle"></div>
          <div className="hero__particle"></div>
          <div className="hero__particle"></div>
          <div className="hero__particle"></div>
          <div className="hero__particle"></div>
          <div className="hero__particle"></div>
        </div>
      </div>

      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <div className="hero__badge">
              <span className="hero__badge-dot"></span>
              Limited Collector Series
            </div>
            <h1 className="hero__title">
              Own The Rarest<br />
              <em>Diecast Machines</em>
            </h1>
            <p className="hero__description">
              Discover museum-grade collectibles, ultra-rare editions, and
              legendary models curated for the world's most discerning
              collectors.
            </p>
            <div className="hero__buttons">
              <Link to="/products" className="btn-primary">
                Explore Collection
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
              </Link>
              <a href="#categories" className="btn-secondary">
                View Catalog
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__car-container">
              <div className="hero__car-glow"></div>
              <div className="hero__car-reflection"></div>
              <img
                src="/images/hero_car.png"
                alt="Premium Limited Edition Diecast Supercar"
                className="hero__car-img"
              />
              <div className="hero__car-ring"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
