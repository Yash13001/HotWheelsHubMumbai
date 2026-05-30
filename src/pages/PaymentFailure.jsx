import { useSearchParams, Link } from "react-router-dom";

export default function PaymentFailure() {
  const [searchParams] = useSearchParams();

  const txnid = searchParams.get("txnid");
  const error = searchParams.get("error") || "The payment transaction failed or was cancelled.";

  return (
    <div style={{ paddingTop: "140px", minHeight: "100vh", paddingBottom: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="container" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="modal-content reveal visible" style={{
          background: "var(--surface)", border: "1px solid rgba(235, 87, 87, 0.2)",
          borderRadius: "28px", padding: "48px 32px", textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
        }}>
          <div style={{
            width: "72px", height: "72px", background: "rgba(235, 87, 87, 0.1)",
            color: "#EB5757", borderRadius: "50%", display: "flex",
            alignItems: "center", justifyContent: "center", margin: "0 auto 28px",
            border: "1px solid rgba(235, 87, 87, 0.2)", boxShadow: "0 0 30px rgba(235, 87, 87, 0.1)"
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h1 className="section-title" style={{ fontSize: "2.2rem", marginBottom: "8px" }}>Payment Failed</h1>
          <p style={{ color: "#EB5757", fontSize: "0.95rem", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "32px" }}>
            Transaction Declined
          </p>

          <div style={{
            background: "rgba(0,0,0,0.25)", border: "1px solid var(--border)",
            borderRadius: "16px", padding: "24px", textAlign: "left",
            marginBottom: "36px", display: "flex", flexDirection: "column", gap: "12px"
          }}>
            {txnid && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                <span style={{ color: "var(--muted)" }}>Transaction ID:</span>
                <span style={{ color: "var(--white)", fontWeight: "500", fontFamily: "monospace" }}>{txnid}</span>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.9rem", borderTop: txnid ? "1px solid var(--border)" : "none", paddingTop: txnid ? "12px" : "0", marginTop: txnid ? "4px" : "0" }}>
              <span style={{ color: "var(--muted)" }}>Reason:</span>
              <span style={{ color: "var(--white)", fontWeight: "500", lineHeight: "1.5", wordBreak: "break-word" }}>{error}</span>
            </div>
          </div>

          <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "32px", lineHeight: "1.6" }}>
            Your account was not charged. If funds were debited, they will be auto-refunded to your original payment source within 3-5 business days.
          </p>

          <div style={{ display: "flex", gap: "16px" }}>
            <Link to="/products" className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
              Return to Products
            </Link>
            <Link to="/" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              Try Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
