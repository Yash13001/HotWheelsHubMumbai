import ProductCard from "./ProductCard";
import { useProducts } from "../hooks/useSupabase";

export default function Bestsellers() {
  const { products, loading } = useProducts({ bestseller: true, limit: 4 });

  return (
    <section className="bestsellers" id="bestsellers">
      <div className="container">
        <div className="bestsellers__header reveal">
          <div>
            <div className="section-label">Most Popular</div>
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">
              The models collectors can't stop adding to their showcases.
            </p>
          </div>
          <a href="#" className="btn-secondary">
            View All
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--gold)" }}>Loading best sellers...</div>
        ) : (
          <div className="bestsellers__grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
