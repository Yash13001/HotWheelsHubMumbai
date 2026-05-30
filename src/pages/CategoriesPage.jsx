import { useState } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useSupabase";
import { PREMIUM_PLACEHOLDER_IMAGE } from "../lib/supabase";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { categories, loading } = useCategories();

  const filteredCategories = categories.filter((cat) =>
    (cat.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ paddingTop: "120px", minHeight: "100vh" }}>
      <div className="container">
        <div className="section-label reveal" style={{ marginBottom: "16px" }}>
          Explore by Category
        </div>
        <h1 className="section-title reveal" style={{ marginBottom: "24px" }}>
          Categories
        </h1>

        <div className="reveal" style={{ marginBottom: "48px", position: "relative", maxWidth: "600px" }}>
          <input
            type="text"
            placeholder="Search categories..."
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
          <div style={{ padding: "64px 0", textAlign: "center", color: "var(--gold)" }}>Loading collections...</div>
        ) : filteredCategories.length > 0 ? (
          <div className="categories__grid" style={{ marginBottom: "80px" }}>
            {filteredCategories.map((cat, index) => (
              <Link to={`/collections/${cat.slug}`} className="category-card reveal" key={cat.id || index}>
                <img src={cat.thumbnail || cat.banner_image || PREMIUM_PLACEHOLDER_IMAGE} alt={`${cat.name || "Category"} Collection`} className="category-card__image" />
                <div className="category-card__overlay"></div>
                <div className="category-card__border"></div>
                <div className="category-card__content">
                  <h3 className="category-card__name">{cat.name}</h3>
                  <p className="category-card__desc">{cat.description || "Browse our exclusive model series."}</p>
                  <div className="category-card__arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ padding: "64px 0", textAlign: "center", color: "var(--muted)", marginBottom: "80px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "48px", height: "48px", margin: "0 auto 16px", opacity: 0.5 }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <p style={{ fontSize: "1.2rem" }}>No categories found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
