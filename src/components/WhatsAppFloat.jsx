import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <div className="wa-float">
      <a
        href="https://chat.whatsapp.com/your-group-link"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float__btn"
        aria-label="Join our WhatsApp group"
      >
        <span className="wa-float__btn-icon">
          <FaWhatsapp />
        </span>
        <span className="wa-float__ripple wa-float__ripple--1"></span>
        <span className="wa-float__ripple wa-float__ripple--2"></span>
        <span className="wa-float__ripple wa-float__ripple--3"></span>
      </a>
    </div>
  );
}
