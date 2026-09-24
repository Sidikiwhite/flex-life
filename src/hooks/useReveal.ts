import { useEffect, useRef } from "react";

/**
 * useReveal
 * ---------
 * Adds an IntersectionObserver to any element with the `reveal` class so
 * sections fade & slide in as they enter the viewport. This powers the
 * scroll-based storytelling effect used across the whole one-page site.
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Observe all elements marked with `.reveal`
    const targets = root.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate only once
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

/**
 * useScrollSpy / scroll helpers are kept inline in components to stay lean.
 */
