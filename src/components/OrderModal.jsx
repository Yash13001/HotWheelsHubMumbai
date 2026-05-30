import { useState } from "react";

export default function OrderModal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  });
  const [status, setStatus] = useState("idle"); // idle, loading, error
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    
    try {
      const totalAmount = product.price * formData.quantity;

      console.log("Requesting Razorpay order from backend...");
      const response = await fetch("/.netlify/functions/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to initialize payment gateway");
        } else {
          console.error("Non-JSON error response from payment gateway:", await response.text());
          throw new Error("Payment server is currently unreachable. Please try again or contact support.");
        }
      }

      const order = await response.json();
      console.log("Razorpay order received, opening checkout...");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "HotWheels Hub Mumbai",
        description: product.title,
        order_id: order.id,
        handler: function (response) {
          const params = new URLSearchParams({
            txnid: response.razorpay_payment_id,
            amount: totalAmount.toString(),
            productinfo: product.title,
            firstname: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            quantity: formData.quantity.toString(),
            product_id: product.id.toString(),
          });
          window.location.href = `/payment-success?${params.toString()}`;
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#d4af37",
        },
        config: {
  display: {
    preferences: {
      show_default_blocks: true,
    },

    blocks: {
      upi: {
        name: "Pay using UPI",

        instruments: [
          {
            method: "upi",
          },
        ],
      },
    },

    sequence: ["block.upi"],
  },
},
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed", response.error);
        setErrorMsg(response.error.description || "Payment failed. Please try again.");
        setStatus("error");
      });

      rzp.open();
      setStatus("idle"); // reset status since popup is open

    } catch (err) {
      console.error("Razorpay checkout failed:", err);
      setErrorMsg(err.message || "Could not set up transaction with Razorpay.");
      setStatus("error");
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
      zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px"
    }}>
      {/* Inline keyframe animation for the spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="modal-content" style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "24px", width: "100%", maxWidth: "500px",
        position: "relative", overflow: "hidden", boxShadow: "var(--shadow-lg)"
      }}>
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: "absolute", top: "20px", right: "20px",
          background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
          width: "32px", height: "32px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10
        }}>
          ✕
        </button>

        <div style={{ padding: "32px" }}>
          <h2 className="section-title" style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Secure Your Model</h2>
          <p style={{ color: "var(--muted)", marginBottom: "24px", fontSize: "0.9rem" }}>
            Reserving: <strong style={{ color: "var(--gold)" }}>{product.title}</strong>
          </p>

          {status === "error" && (
            <div style={{ background: "rgba(235, 87, 87, 0.1)", color: "#EB5757", padding: "12px", borderRadius: "8px", marginBottom: "24px", fontSize: "0.9rem", border: "1px solid rgba(235, 87, 87, 0.2)", wordBreak: "break-word" }}>
              {errorMsg || "Failed to set up payment. Please try again."}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: "8px" }}>Full Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} 
                style={{ width: "100%", padding: "12px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff", outline: "none" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: "8px" }}>Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} 
                  style={{ width: "100%", padding: "12px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: "8px" }}>Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} 
                  style={{ width: "100%", padding: "12px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff", outline: "none" }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: "8px" }}>Delivery Address</label>
              <textarea required name="address" value={formData.address} onChange={handleChange} rows="3"
                style={{ width: "100%", padding: "12px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff", outline: "none", resize: "none" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
              <span style={{ color: "var(--muted)" }}>Quantity:</span>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", borderRadius: "8px", padding: "4px" }}>
                <button type="button" onClick={() => setFormData(p => ({...p, quantity: Math.max(1, p.quantity - 1)}))} style={{ width: "32px", height: "32px", background: "var(--surface)", border: "none", color: "#fff", borderRadius: "4px" }}>-</button>
                <span style={{ width: "20px", textAlign: "center" }}>{formData.quantity}</span>
                <button type="button" onClick={() => setFormData(p => ({...p, quantity: Math.min(product.stock || 10, p.quantity + 1)}))} style={{ width: "32px", height: "32px", background: "var(--surface)", border: "none", color: "#fff", borderRadius: "4px" }}>+</button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "24px", marginTop: "16px" }}>
              <div>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "4px" }}>Total Amount</p>
                <p style={{ fontSize: "1.4rem", fontWeight: "bold", color: "var(--gold)" }}>
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price * formData.quantity)}
                </p>
              </div>
              <button type="submit" disabled={status === "loading" || (product.stock === 0)} className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                {status === "loading" && (
                  <svg viewBox="0 0 24 24" style={{ width: "16px", height: "16px", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", animation: "spin 0.8s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" opacity="0.25" stroke="currentColor" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" />
                  </svg>
                )}
                {status === "loading" ? "Redirecting to PayU..." : product.stock === 0 ? "Sold Out" : "Confirm & Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
