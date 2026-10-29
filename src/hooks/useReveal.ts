import { useEffect, useRef } from "react";

/**
 * useReveal
 * ---------
 * Adds an IntersectionObserver to any element with the `reveal` class so
 * sections fade & slide in as they enter the viewport.
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // On arrête d'observer une fois que c'est visible.
            // L'élément GARDERA la classe 'visible' définitivement.
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}
