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
            // On utilise un attribut data-* en plus de la classe : React
            // réécrit entièrement l'attribut `class` des éléments dont le
            // className est dynamique (ex. cartes de services), ce qui
            // effacerait la classe `visible` ajoutée ici. L'attribut data
            // n'est pas géré par React et persiste donc.
            entry.target.setAttribute("data-revealed", "true");
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
