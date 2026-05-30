import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useProduct, useProducts } from "../hooks/useSupabase";
import OrderModal from "../components/OrderModal";
import ProductCard from "../components/ProductCard";
import { PREMIUM_PLACEHOLDER_IMAGE } from "../lib/supabase";

export default function ProductDetails() {
  const { slug } = useParams();
  const { product, loading } = useProduct(slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prevSlug, setPrevSlug] = useState(slug);

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setCurrentImageIndex(0);
  }

  // Defensive parser for images array in ProductDetails
  let images = [PREMIUM_PLACEHOLDER_IMAGE];
  try {
    if (product?.images) {
      if (Array.isArray(product.images) && product.images.length > 0) {
        images = product.images;
      } else if (typeof product.images === 'string') {
        if (product.images.startsWith('[') && product.images.endsWith(']')) {
          const parsed = JSON.parse(product.images);
          if (Array.isArray(parsed) && parsed.length > 0) {
            images = parsed;
          }
        } else if (product.images.trim() !== "" && product.images !== "null") {
          images = [product.images];
        }
      }
    }
  } catch (e) {
    console.error("Error parsing product images in ProductDetails:", e);
  }
  
  const { products: relatedProducts } = useProducts({ 
    category_slug: product?.category_slug, 
    limit: 5 
  });
  
  // Filter out current product from related
  const filteredRelated = relatedProducts.filter(p => p.id !== product?.id).slice(0, 4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div style={{ paddingTop: "120px", minHeight: "100vh", textAlign: "center" }}>
        <div className="container">
          <h1 className="section-title" style={{ color: "var(--gold)" }}>Loading product...</h1>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ paddingTop: "120px", minHeight: "100vh", textAlign: "center" }}>
        <div className="container">
          <h1 className="section-title">Product not found</h1>
          <Link to="/products" className="btn-primary" style={{ marginTop: "24px", display: "inline-flex" }}>
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const formattedPrice = product.price 
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)
    : "Price on Request";
  
  let badge = null;
  let badgeClass = "";
  if (product.stock === 0) { badge = "Sold Out"; badgeClass = "product-card__badge--hot"; }
  else if (product.rarity === "Super Treasure Hunt" || product.rarity === "Limited Drop") { badge = "Rare Find"; badgeClass = "product-card__badge--limited"; }
  else if (product.bestseller) { badge = "Hot Pick"; badgeClass = "product-card__badge--hot"; }
  else if (product.featured) { badge = "Top Rated"; badgeClass = "product-card__badge--top"; }

  return (
    <div style={{ paddingTop: "120px", minHeight: "100vh", paddingBottom: "80px" }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: "32px", fontSize: "0.9rem", color: "var(--muted)" }}>
          <Link to="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <Link to="/products" style={{ color: "var(--muted)", textDecoration: "none" }}>Products</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--gold)" }}>{product.title}</span>
        </div>

        <div className="product-details__grid">
          {/* Image Gallery (Carousel) */}
          <div>
            <div className="carousel__main">
              {badge && (
                <span className={`product-card__badge ${badgeClass}`} style={{ top: "24px", left: "24px", zIndex: 5 }}>
                  {badge}
                </span>
              )}
              {images.length > 1 && (
                <button className="carousel__btn carousel__btn--prev" onClick={prevImage} aria-label="Previous image">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              )}
              <img 
                src={images[currentImageIndex]} 
                alt={`${product.title} - View ${currentImageIndex + 1}`} 
                className="carousel__img"
              />
              {images.length > 1 && (
                <button className="carousel__btn carousel__btn--next" onClick={nextImage} aria-label="Next image">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="carousel__thumbnails">
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`carousel__thumb ${currentImageIndex === index ? "carousel__thumb--active" : ""}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="section-label" style={{ marginBottom: "16px" }}>{product.rarity || 'Standard'} · {product.category_slug?.replace('-', ' ') || 'Collection'}</div>
            <h1 className="section-title" style={{ marginBottom: "16px", fontSize: "2.5rem" }}>{product.title}</h1>
            
            <div className="product-card__rating" style={{ marginBottom: "24px", justifyContent: "flex-start", gap: "12px" }}>
              <div className="product-card__stars">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    opacity={i < (product.stars || 5) ? 1 : 0.3}
                    style={{ width: "20px", height: "20px" }}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="product-card__rating-count" style={{ fontSize: "1rem" }}>({(product.title?.length || 0) * 12 + 45} reviews)</span>
            </div>

            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--gold)", marginBottom: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
              {formattedPrice}
            </div>

            <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "48px" }}>
              {product.description || "No description available for this premium scale model."}
            </p>

            <div style={{ display: "flex", gap: "16px" }}>
              <button 
                className="btn-primary" 
                onClick={() => setIsModalOpen(true)}
                disabled={product.stock === 0}
                style={{ flex: 1, padding: "16px", fontSize: "1.1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", opacity: product.stock === 0 ? 0.5 : 1 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                {product.stock === 0 ? "Out of Stock" : "Reserve Model"}
              </button>
              
              <button className="btn-secondary" style={{ padding: "16px", width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>
            </div>
            
            {/* Features / Details grid */}
            <div style={{ marginTop: "48px", borderTop: "1px solid var(--border)", paddingTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                <h4 style={{ color: "var(--white)", marginBottom: "8px" }}>Category</h4>
                <p style={{ color: "var(--muted)", textTransform: "capitalize" }}>{product.category_slug?.replace('-', ' ')}</p>
              </div>
              <div>
                <h4 style={{ color: "var(--white)", marginBottom: "8px" }}>Rarity</h4>
                <p style={{ color: "var(--muted)" }}>{product.rarity || "Standard"}</p>
              </div>
              <div>
                <h4 style={{ color: "var(--white)", marginBottom: "8px" }}>Stock</h4>
                <p style={{ color: "var(--muted)" }}>{product.stock > 0 ? `${product.stock} units left` : 'Out of Stock'}</p>
              </div>
              <div>
                <h4 style={{ color: "var(--white)", marginBottom: "8px" }}>Added</h4>
                <p style={{ color: "var(--muted)" }}>{new Date(product.created_at).toLocaleDateString()}</p>
              </div>
            </div>

          </div>
        </div>
        
        {/* Related Products */}
        {filteredRelated.length > 0 && (
          <div style={{ marginTop: "120px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>More from this collection</div>
            <h2 className="section-title" style={{ marginBottom: "48px" }}>Related Models</h2>
            <div className="bestsellers__grid">
              {filteredRelated.map(related => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} />
    </div>
  );
}
