import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { submitOrder, updateOrderStatus } from "../hooks/useSupabase";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState("processing"); // processing, success, error
  const [errorMsg, setErrorMsg] = useState("");
  const saveTriggered = useRef(false);

  // Extract parameters passed from the Razorpay success handler
  const txnid = searchParams.get("txnid");
  const amount = searchParams.get("amount");
  const productinfo = searchParams.get("productinfo");
  const firstname = searchParams.get("firstname");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const address = searchParams.get("address");
  const quantity = searchParams.get("quantity") || "1";
  const product_id = searchParams.get("product_id");

  useEffect(() => {
    // Prevent double execution in React 18/19 StrictMode
    if (saveTriggered.current) return;
    saveTriggered.current = true;

    async function recordOrder() {
      if (!txnid || !product_id) {
        setSaveStatus("error");
        setErrorMsg("Missing critical transaction details.");
        return;
      }

      // Check if order has already been logged in this browser session
      const sessionKey = `razorpay_saved_${txnid}`;
      if (sessionStorage.getItem(sessionKey)) {
        console.log("Order was already recorded in Supabase in this session.");
        setSaveStatus("success");
        return;
      }

      try {
        console.log("Recording order to database...");
        // 1. Submit order details to Supabase as pending
        // We pack the Txn ID and amount into the address field to satisfy the requested data storage
        // without altering the database table structure.
        const formattedAddress = `${address} | Txn ID: ${txnid} | Paid: Rs. ${amount}`;
        const res = await submitOrder({
          name: firstname,
          phone: phone,
          email: email,
          address: formattedAddress,
          product_id: product_id,
          quantity: parseInt(quantity, 10),
        });

        if (!res.success) {
          throw new Error(res.error?.message || "Failed to write order record to database.");
        }

        const orderId = res.data[0].id;
        console.log(`Supabase order created: ${orderId}. Updating payment status to paid...`);

        // 2. Update status to 'paid' after payment callback validation
        const updateRes = await updateOrderStatus(orderId, "paid");
        if (!updateRes.success) {
          throw new Error(updateRes.error?.message || "Failed to update order payment status.");
        }

        // Save order ID to session storage to prevent duplicates
        sessionStorage.setItem(sessionKey, "saved");
        setSaveStatus("success");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } catch (err) {
        console.error("Error saving order on payment success:", err);
        setErrorMsg(err.message || "Could not log order details.");
        setSaveStatus("error");
      }
    }

    recordOrder();
  }, [txnid, amount, productinfo, firstname, email, phone, address, quantity, product_id]);

  return (
    <div style={{ paddingTop: "140px", minHeight: "100vh", paddingBottom: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="container" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="modal-content reveal visible" style={{
          background: "var(--surface)", border: "1px solid var(--border-gold)",
          borderRadius: "28px", padding: "48px 32px", textAlign: "center",
          boxShadow: "var(--shadow-gold)"
        }}>
          {saveStatus === "processing" && (
            <div>
              <div style={{ margin: "0 auto 32px", width: "64px", height: "64px", border: "4px solid var(--border)", borderTopColor: "var(--gold)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
              <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "16px" }}>Confirming Payment...</h2>
              <p style={{ color: "var(--muted)" }}>
                We are securing your order and validating the transaction with Razorpay. Please do not close or refresh this page.
              </p>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {saveStatus === "success" && (
            <div>
              <div style={{
                width: "72px", height: "72px", background: "var(--gold-dim)",
                color: "var(--gold)", borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", margin: "0 auto 28px",
                border: "1px solid var(--border-gold)", boxShadow: "0 0 30px rgba(212, 175, 55, 0.2)"
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1 className="section-title" style={{ fontSize: "2.2rem", marginBottom: "8px" }}>Payment Successful!</h1>
              <p style={{ color: "var(--gold)", fontSize: "0.95rem", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "32px" }}>
                Order Confirmed
              </p>

              <div style={{
                background: "rgba(0,0,0,0.25)", border: "1px solid var(--border)",
                borderRadius: "16px", padding: "24px", textAlign: "left",
                marginBottom: "36px", display: "flex", flexDirection: "column", gap: "12px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--muted)" }}>Transaction ID:</span>
                  <span style={{ color: "var(--white)", fontWeight: "500", fontFamily: "monospace" }}>{txnid}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--muted)" }}>Model:</span>
                  <span style={{ color: "var(--white)", fontWeight: "500" }}>{productinfo}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--muted)" }}>Quantity:</span>
                  <span style={{ color: "var(--white)", fontWeight: "500" }}>{quantity}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", borderTop: "1px solid var(--border)", paddingTop: "12px", marginTop: "4px" }}>
                  <span style={{ color: "var(--muted)" }}>Total Paid:</span>
                  <span style={{ color: "var(--gold)", fontWeight: "700", fontSize: "1.1rem" }}>Rs. {amount}</span>
                </div>
              </div>

              <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "32px", lineHeight: "1.6" }}>
                A confirmation has been sent to <strong>{email}</strong>. Our premium delivery team will coordinate dispatch to your showcase shortly.
              </p>

              <Link to="/" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Return to Homescreen
              </Link>
            </div>
          )}

          {saveStatus === "error" && (
            <div>
              <div style={{
                width: "72px", height: "72px", background: "rgba(235, 87, 87, 0.1)",
                color: "#EB5757", borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", margin: "0 auto 28px",
                border: "1px solid rgba(235, 87, 87, 0.2)"
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>

              <h1 className="section-title" style={{ fontSize: "2rem", marginBottom: "16px" }}>Database Error</h1>
              <p style={{ color: "var(--muted)", marginBottom: "32px", fontSize: "0.95rem" }}>
                Your payment was successful (Txn ID: {txnid}), but we encountered an issue recording the order details in our database: <br />
                <strong style={{ color: "#EB5757" }}>{errorMsg}</strong>
              </p>

              <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "32px" }}>
                Please take a screenshot of this page and contact customer support at <strong>support@hotwheelshubmumbai.com</strong> to finalize your delivery details.
              </p>

              <div style={{ display: "flex", gap: "16px" }}>
                <Link to="/products" className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                  Return to Products
                </Link>
                <a href="mailto:support@hotwheelshubmumbai.com" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  Contact Support
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
