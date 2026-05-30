import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CategoriesPage from "./pages/CategoriesPage";
import Collectibles from "./pages/Collectibles";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Collection from "./pages/Collection";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";

function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target.parentElement;
            const siblings = parent
              ? Array.from(parent.querySelectorAll(".reveal"))
              : [];
            const siblingIndex = siblings.indexOf(entry.target);
            const delay = siblingIndex >= 0 ? siblingIndex * 100 : 0;

            setTimeout(() => {
              entry.target.classList.add("visible");
            }, delay);

            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const observeElements = () => {
      const revealElements = document.querySelectorAll(".reveal:not(.visible)");
      revealElements.forEach((el) => {
        revealObserver.observe(el);
      });
    };

    // Initial check
    observeElements();

    // Set up MutationObserver to re-scan for reveal elements added dynamically
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollReveal />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/collections/:category_slug" element={<Collection />} />
        <Route path="/collectibles" element={<Collectibles />} />
        <Route path="/about" element={<About />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </BrowserRouter>
  );
}

export default App;
