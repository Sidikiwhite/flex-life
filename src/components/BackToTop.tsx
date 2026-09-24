import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * BackToTop
 * ---------
 * Floating button that appears after scrolling down and smoothly returns
 * to the top of the page.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`back-top ${show ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut de page"
      title="Retour en haut"
    >
      <ArrowUp size={22} />
    </button>
  );
}
