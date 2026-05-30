import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useSupabase";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading } = useProducts();

  const filteredProducts = products.filter((product) =>
    (product.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.category_slug || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ paddingTop: "120px", minHeight: "100vh" }}>
      <div className="container">
        <div className="section-label reveal" style={{ marginBottom: "16px" }}>
          Complete Catalog
        </div>
        <h1 className="section-title reveal" style={{ marginBottom: "24px" }}>
          All Products
        </h1>

        <div className="reveal" style={{ marginBottom: "48px", position: "relative", maxWidth: "600px" }}>
          <input
            type="text"
            placeholder="Search products by name or series..."
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
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              pointerEvents: "none"
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        
        {loading ? (
          <div className="bestsellers__grid" style={{ marginBottom: "80px" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="product-card skeleton-card" style={{ height: "420px", opacity: 0.4, background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "24px" }}>
                <div style={{ width: "100%", height: "200px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}></div>
                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
                  <div style={{ width: "40%", height: "14px", background: "rgba(255,255,255,0.02)", borderRadius: "4px" }}></div>
                  <div style={{ width: "80%", height: "24px", background: "rgba(255,255,255,0.04)", borderRadius: "4px" }}></div>
                  <div style={{ width: "60%", height: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }}></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px" }}>
                  <div style={{ width: "30%", height: "24px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }}></div>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }}></div>
                </div>
              </div>
            ))}
          </div>
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
            <p style={{ fontSize: "1.2rem" }}>No products found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
