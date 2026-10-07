import { Mail, MapPin, Phone, Send } from "lucide-react";

/**
 * Social icons are provided as inline SVGs because brand icons are no
 * longer shipped with lucide-react. Each path is the standard brand glyph.
 */
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/flex.code.flex.life/",
    path: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/14uzC7nwFni/",
    path: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.09 15.96 2 14.64 2 12.4 2 11 3.32 11 5.86V9.5H8.5v4H11v8.5h3v-8.5z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@flexlife43?is_from_webapp=1&sender_device=pc",
    path: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 2.04 1.72 2.04 1.5C16.45 2.0 l 17.5 2.04 17.5 2.04v11.14h-3.33v-6.43c0-1.43-.4-2.45-1.65-2.45-1.15 0-1.86.83-1.86 2.12V13.14H7.5v-6.43c0-1.54 1.1-2.5 2.6-2.5.9 0 1.6.3 2.1.8V.02z" />
      </svg>
    ),
  },
];

const CONTACT_INFO = [
  { icon: Mail, title: "Email", value: "flex.code.flex.life@gmail.com" },
  { icon: Phone, title: "Téléphone", value: "05 64 40 20 36" },
  { icon: MapPin, title: "Lieu", value: "Grand Bassam, Côte d'Ivoire" },
  { icon: Send, title: "Réponse", value: "Sous 24h, 7j/7" },
];

/**
 * Footer
 * ------
 * Elegant footer for Flex-Life.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top" style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "20px",
          color: "var(--text-muted, #666)",
          fontSize: "0.95rem"
        }}>
          {CONTACT_INFO.map((info, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <info.icon size={18} />
              <span>{info.value}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", width: "100%", marginBottom: "24px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "8px" }}>
            "Nous transformons vos désirs en souvenirs numériques."
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "20px" }}>
          <p className="f-text" style={{ fontSize: "0.9rem" }}>
            © {new Date().getFullYear()} <span style={{ fontWeight: 700 }}>Flex-Life</span> · Tous droits réservés.
          </p>
          <div className="footer-links">
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={s.label} title={s.label}>
                <div style={{ transform: 'scale(1.2)', display: 'flex' }}>
                  {s.path}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
