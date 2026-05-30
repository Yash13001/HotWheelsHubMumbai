import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useSupabase";
import { PREMIUM_PLACEHOLDER_IMAGE } from "../lib/supabase";

export default function Categories() {
  const { categories, loading } = useCategories();
  
  return (
    <section className="categories" id="categories">
      <div className="container">
        <div className="categories__header reveal">
          <div className="section-label">Browse Collections</div>
          <h2 className="section-title">Curated For Collectors</h2>
          <p className="section-subtitle">
            Explore our meticulously organized collections — each category a
            world of precision, craftsmanship, and automotive heritage.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--gold)" }}>Loading collections...</div>
        ) : (
          <div className="categories__grid">
            {categories.slice(0, 4).map((cat) => (
              <Link to={`/collections/${cat.slug}`} className="category-card reveal" key={cat.id}>
                <img
                  src={cat.thumbnail || cat.banner_image || PREMIUM_PLACEHOLDER_IMAGE}
                  alt={cat.name}
                  className="category-card__image"
                />
                <div className="category-card__overlay"></div>
                <div className="category-card__border"></div>
                <div className="category-card__content">
                  <h3 className="category-card__name">{cat.name}</h3>

                  <div className="category-card__arrow">
                    <svg
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
