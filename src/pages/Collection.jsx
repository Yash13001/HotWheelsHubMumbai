import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts, useCategories } from "../hooks/useSupabase";

export default function Collection() {
  const { category_slug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { products, loading: productsLoading } = useProducts({ category_slug: category_slug?.trim() });
  const { categories } = useCategories();
  
  const category = categories.find(c => c.slug?.trim() === category_slug?.trim());

  const filteredProducts = products.filter((product) =>
    (product.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ paddingTop: "120px", minHeight: "100vh" }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: "32px", fontSize: "0.9rem", color: "var(--muted)" }}>
          <Link to="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <Link to="/categories" style={{ color: "var(--muted)", textDecoration: "none" }}>Categories</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--gold)" }}>{category?.name || category_slug.replace('-', ' ')}</span>
        </div>

        <div className="section-label reveal" style={{ marginBottom: "16px", textTransform: "capitalize" }}>
          {category?.name || category_slug.replace('-', ' ')} Collection
        </div>
        <h1 className="section-title reveal" style={{ marginBottom: "24px", textTransform: "capitalize" }}>
          {category?.name || category_slug.replace('-', ' ')} Models
        </h1>
        {category?.description && (
          <p style={{ color: "var(--muted)", marginBottom: "32px", maxWidth: "600px", lineHeight: "1.6" }}>
            {category.description}
          </p>
        )}

        <div className="reveal" style={{ marginBottom: "48px", position: "relative", maxWidth: "600px" }}>
          <input
            type="text"
            placeholder={`Search ${category?.name || "this collection"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 24px 16px 52px",
              borderRadius: "12px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--white)",
              fontSize: "1rem",
              fontFamily: "var(--font-body)",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", width: "20px", height: "20px", pointerEvents: "none" }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        
        {productsLoading ? (
          <div style={{ padding: "64px 0", textAlign: "center", color: "var(--gold)" }}>Loading {category_slug.replace('-', ' ')} models...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="bestsellers__grid" style={{ marginBottom: "80px" }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ padding: "64px 0", textAlign: "center", color: "var(--muted)", marginBottom: "80px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "48px", height: "48px", margin: "0 auto 16px", opacity: 0.5 }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <p style={{ fontSize: "1.2rem" }}>No products found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
