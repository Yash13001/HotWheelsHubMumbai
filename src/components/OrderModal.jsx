import { useState } from "react";

export default function OrderModal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setErrorMsg("");

    try {
      const totalAmount = product.price * formData.quantity;

      console.log("Creating Razorpay order...");

      const response = await fetch("/.netlify/functions/create-order", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: totalAmount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to initialize Razorpay"
        );
      }

      const order = await response.json();

      console.log("Razorpay order created:", order);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "HotWheels Hub Mumbai",

        description: product.title,

        order_id: order.id,

        handler: function (response) {
          console.log("Payment Success:", response);

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
          },
        },

        modal: {
          ondismiss: function () {
            console.log("Checkout closed");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);

        setErrorMsg(
          response.error.description ||
            "Payment failed. Please try again."
        );

        setStatus("error");
      });

      rzp.open();

      setStatus("idle");

    } catch (err) {
      console.error("Checkout Error:", err);

      setErrorMsg(
        err.message ||
          "Could not initialize Razorpay checkout."
      );

      setStatus("error");
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(10px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div
        className="modal-content"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "28px",
          width: "100%",
          maxWidth: "520px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 80px rgba(0,0,0,0.5)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ✕
        </button>

        <div style={{ padding: "34px" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              marginBottom: "10px",
            }}
          >
            Secure Your Model
          </h2>

          <p
            style={{
              color: "var(--muted)",
              marginBottom: "28px",
            }}
          >
            Reserving:
            <strong style={{ color: "var(--gold)" }}>
              {" "}
              {product.title}
            </strong>
          </p>

          {status === "error" && (
            <div
              style={{
                background: "rgba(235,87,87,0.1)",
                color: "#EB5757",
                padding: "14px",
                borderRadius: "10px",
                marginBottom: "24px",
                border: "1px solid rgba(235,87,87,0.2)",
                fontSize: "0.9rem",
                wordBreak: "break-word",
              }}
            >
              {errorMsg}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "var(--muted)",
                  fontSize: "0.9rem",
                }}
              >
                Full Name
              </label>

              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "var(--muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  Email Address
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "var(--muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  Phone Number
                </label>

                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "var(--muted)",
                  fontSize: "0.9rem",
                }}
              >
                Delivery Address
              </label>

              <textarea
                required
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  resize: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <span style={{ color: "var(--muted)" }}>
                Quantity
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "5px",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: Math.max(1, prev.quantity - 1),
                    }))
                  }
                  style={qtyBtn}
                >
                  -
                </button>

                <span>{formData.quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: Math.min(
                        product.stock || 10,
                        prev.quantity + 1
                      ),
                    }))
                  }
                  style={qtyBtn}
                >
                  +
                </button>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid var(--border)",
                marginTop: "20px",
                paddingTop: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.85rem",
                    marginBottom: "5px",
                  }}
                >
                  Total Amount
                </p>

                <p
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "800",
                    color: "var(--gold)",
                  }}
                >
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(product.price * formData.quantity)}
                </p>
              </div>

              <button
                type="submit"
                disabled={
                  status === "loading" || product.stock === 0
                }
                className="btn-primary"
                style={{
                  minWidth: "190px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {status === "loading" && (
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      width: "18px",
                      height: "18px",
                      animation: "spin 0.8s linear infinite",
                    }}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      opacity="0.25"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                    />

                    <path
                      d="M12 2a10 10 0 0 1 10 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                )}

                {status === "loading"
                  ? "Redirecting to Razorpay..."
                  : product.stock === 0
                  ? "Sold Out"
                  : "Confirm & Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  color: "#fff",
  outline: "none",
  fontSize: "0.95rem",
};

const qtyBtn = {
  width: "34px",
  height: "34px",
  borderRadius: "8px",
  border: "none",
  background: "var(--surface)",
  color: "#fff",
  cursor: "pointer",
};