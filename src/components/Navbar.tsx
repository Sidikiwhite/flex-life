import { useEffect, useState } from "react";
import { Sun, Moon, Code2 } from "lucide-react";

/** Navigation items used by both the hidden overlay menu and the app. */
export const NAV_LINKS = [
  { id: "accueil", label: "Accueil", index: "01" },
  { id: "apropos", label: "À propos", index: "02" },
  { id: "services", label: "Services", index: "03" },
  { id: "parcours", label: "Parcours", index: "04" },
  { id: "faq", label: "FAQ", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

/**
 * Navbar
 * ------
 * Fixed top bar containing only the logo, a theme toggle and a hamburger
 * button. The hamburger opens a full-screen overlay navigation with
 * animated clip-path reveal. Turns glassy once the page is scrolled.
 */
export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for the glassy effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Smooth-scroll to a section then close the overlay
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
        {/* Logo */}
        <a href="#accueil" className="logo" onClick={goTo("accueil")}>
          <span className="logo-mark"><Code2 size={20} /></span>
          <span>
            flex<span className="logo-slash">-</span>code
            <span style={{ opacity: 0.6, fontSize: "0.7rem", display: "block" }}>
              / flex-life
            </span>
          </span>
        </a>

        {/* Right side controls */}
        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            title={theme === "dark" ? "Mode clair" : "Mode sombre"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={`menu-btn ${open ? "open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-controls="overlay-nav"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </header>

      {/* Full-screen hidden overlay navigation */}
      <nav id="overlay-nav" className={`overlay-nav ${open ? "open" : ""}`} aria-hidden={!open}>
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
