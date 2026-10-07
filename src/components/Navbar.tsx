import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

/** Navigation items used by both the hidden overlay menu and the app. */
export const NAV_LINKS = [
  { id: "apropos", label: "L'Esprit", index: "01" },
  { id: "services", label: "Expériences", index: "02" },
  { id: "parcours", label: "Le Parcours", index: "03" },
  { id: "faq", label: "Questions", index: "04" },
  { id: "contact", label: "Nous contacter", index: "05" },
];

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

/**
 * Navbar
 * ------
 * Fixed top bar containing the logo, a primary CTA, and a hamburger menu.
 * Transition to a soft blur effect once the page is scrolled.
 */
export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* Logo - Only visible when scrolled */}
        <a
          href="#accueil"
          className="logo"
          onClick={goTo("accueil")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            opacity: scrolled ? 1 : 0,
            visibility: scrolled ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
          }}
        >
          <img
            src="/assets/images/favicon.svg"
            alt="Flex-Life Logo"
            style={{
              height: '68px',
              width: 'auto',
              borderRadius: '12px',
              objectFit: 'cover'
            }}
          />
          <div
            aria-label="Flex-Life"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.1em',
              fontWeight: 1000,
              letterSpacing: '0.5em',
              fontSize: '1.8rem',
              lineHeight: 1,
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ color: '#111111' }}>Flex-</span>
            <span style={{ color: '#f7b7c7' }}>Life</span>
          </div>
        </a>


        {/* Right side controls */}
        <div className="nav-actions">
          <a href="#contact" className="btn btn-primary navbar-cta" onClick={goTo("contact")}>
            Créer mon événement
          </a>

          <button
            className={`menu-btn ${open ? "open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className="menu-lines" aria-hidden="true">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
            <span className="menu-back" aria-hidden="true">←</span>
          </button>
        </div>
      </header>

      {/* Full-screen hidden overlay navigation */}
      <nav id="overlay-nav" className={`overlay-nav ${open ? "open" : ""}`} aria-hidden={!open}>
        <button
          type="button"
          className="overlay-close"
          aria-label="Fermer le menu"
          onClick={() => setOpen(false)}
        >
          ←
        </button>

        {NAV_LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id)}>
            <span className="nav-index">{l.index}</span>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  );
}
