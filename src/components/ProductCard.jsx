import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PREMIUM_PLACEHOLDER_IMAGE } from "../lib/supabase";

export default function ProductCard({ product }) {
  // Defensive fallbacks for entire product object
  const { 
    slug = "", 
    title = "Premium Scale Model", 
    price = null, 
    images = null, 
    rarity = "Standard", 
    category_slug = "Collection", 
    stock = 1, 
    bestseller = false, 
    featured = false 
  } = product || {};

  const id = slug || "";
  
  // Safe parsing of image properties
  let imageSrc = PREMIUM_PLACEHOLDER_IMAGE;
  try {
    if (images) {
      if (Array.isArray(images) && images.length > 0) {
        imageSrc = images[0];
      } else if (typeof images === 'string') {
        if (images.startsWith('[') && images.endsWith(']')) {
          const parsed = JSON.parse(images);
          if (Array.isArray(parsed) && parsed.length > 0) {
            imageSrc = parsed[0];
          }
        } else if (images.trim() !== "" && images !== "null") {
          imageSrc = images;
        }
      }
    }
  } catch (e) {
    console.error("Error parsing product images inside ProductCard:", e);
  }

  // Debugging logs requested in Task 7
  console.log(`ProductCard Rendering: "${title}"`, {
    id,
    price,
    rarity,
    imageSrc,
    images
  });

  const altText = title || "Premium Scale Model";
  const name = title || "Premium Scale Model";
  const meta = `${rarity || 'Standard'} · ${(category_slug || 'Collection').replace('-', ' ')}`;
  
  // Format price
  const formattedPrice = price 
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
    : "Price on Request";
  
  // Badge logic based on database fields
  let badge = null;
  let badgeClass = "";
  if (stock === 0) { badge = "Sold Out"; badgeClass = "product-card__badge--hot"; }
  else if (rarity === "Super Treasure Hunt" || rarity === "Limited Drop" || rarity === "Collectible") { badge = "Rare Find"; badgeClass = "product-card__badge--limited"; }
  else if (bestseller) { badge = "Hot Pick"; badgeClass = "product-card__badge--hot"; }
  else if (featured) { badge = "Top Rated"; badgeClass = "product-card__badge--top"; }

  // Fallback for UI elements that aren't in DB yet
  const stars = 5;
  const ratingCount = (title?.length || 0) * 12 + 45;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [transform, setTransform] = useState("");
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2;
    const rotateY = ((x - centerX) / centerX) * 2;
    setTransform(
      `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    );
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleCardClick = () => {
    if (id) {
      navigate(`/product/${id}`);
    }
  };

  return (
    <div
      className="product-card reveal"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ transform, cursor: id ? "pointer" : "default" }}
    >
      {badge && (
        <span className={`product-card__badge ${badgeClass}`}>{badge}</span>
      )}
      <button
        className="product-card__wishlist"
        aria-label="Add to wishlist"
        onClick={(e) => {
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill={isWishlisted ? "#EB5757" : "none"}
          stroke={isWishlisted ? "#EB5757" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </button>
      <div className="product-card__image-wrapper">
        <img src={imageSrc} alt={altText} className="product-card__image" />
      </div>
      <div className="product-card__info">
        <div className="product-card__meta">{meta}</div>
        <h3 className="product-card__name">{name}</h3>
        <div className="product-card__rating">
          <div className="product-card__stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                fill="currentColor"
                opacity={i < stars ? 1 : 0.3}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="product-card__rating-count">({ratingCount})</span>
        </div>
        <div className="product-card__bottom">
          <div className="product-card__price">
            {formattedPrice}
          </div>
          <button
            className="product-card__add-btn"
            aria-label="Add to cart"
            onClick={handleAddToCart}
            style={
              isAdded
                ? { background: "#27AE60", borderColor: "#27AE60", color: "#fff" }
                : {}
            }
          >
            {isAdded ? (
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
