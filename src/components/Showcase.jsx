import { useProducts } from "../hooks/useSupabase";
import { useNavigate } from "react-router-dom";

export default function Showcase() {
  // Pull the most recently added featured product as the showcase hero
  const { products, loading } = useProducts({ featured: true, limit: 1 });
  const navigate = useNavigate();
  const product = products[0] || null;

  const formattedPrice = product
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(product.price)
    : "₹0";

  return (
    <section className="showcase" id="showcase">
      <div className="container">
        <div className="showcase__inner reveal">
          <div className="showcase__glow-1"></div>
          <div className="showcase__glow-2"></div>
          <div className="showcase__content">
            <div className="showcase__eyebrow">★ Museum Spotlight</div>
            <h2 className="showcase__title">
              {loading ? (
                <>
                  Loading
                  <br />
                  Spotlight...
                </>
              ) : product ? (
                <>
                  <span>{product.title}</span>
                </>
              ) : (
                <>
                  The <span>Black Gold</span>
                  <br />
                  Phantom Edition
                </>
              )}
            </h2>
            <p className="showcase__desc">
              {product?.description ||
                "A masterpiece of diecast engineering. Hand-painted matte black finish with 24K gold trim detailing. Only 100 units worldwide — each individually numbered and certified."}
            </p>
            <div className="showcase__price-row">
              <div className="showcase__price">
                {product ? formattedPrice : "₹12,999"}
              </div>
              <div className="showcase__price-label">Collector's Price</div>
            </div>
            <button
              className="btn-primary"
              onClick={() => product && navigate(`/product/${product.slug}`)}
              style={{ cursor: product ? "pointer" : "default" }}
            >
              Reserve Now
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
            </button>
          </div>
          <div className="showcase__visual">
            <div className="showcase__car-wrapper">
              <img
                src={product?.images?.[0] || "/images/cat_supercars.png"}
                alt={product?.title || "Black Gold Phantom Edition"}
                className="showcase__car-img"
              />
              <div className="showcase__car-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
