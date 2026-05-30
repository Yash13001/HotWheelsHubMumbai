import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useSupabase";

export default function Collectibles() {
  // Fetch products that are rare / limited / featured — i.e. collectible tier
  const { products, loading } = useProducts({ featured: true });

  return (
    <div style={{ paddingTop: "120px", minHeight: "100vh" }}>
      <div className="container">
        <div className="section-label reveal" style={{ marginBottom: "16px" }}>
          Exclusive & Rare Finds
        </div>
        <h1 className="section-title reveal" style={{ marginBottom: "48px" }}>
          Collectibles
        </h1>
        <p className="section-subtitle reveal" style={{ marginBottom: "48px" }}>
          Explore our most coveted diecast models. These pieces are highly sought after by collectors worldwide, featuring chase editions, limited productions, and vintage masterpieces.
        </p>

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
        ) : products.length > 0 ? (
          <div className="bestsellers__grid" style={{ marginBottom: "80px" }}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ padding: "64px 0", textAlign: "center", color: "var(--muted)", marginBottom: "80px" }}>
            <p style={{ fontSize: "1.2rem" }}>No collectibles available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
