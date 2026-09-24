import { useEffect, useRef } from "react";

/**
 * CustomCursor
 * ------------
 * Renders a neon dot + trailing ring that follow the mouse. The ring
 * grows when hovering over interactive elements (links, buttons).
 * Disabled automatically on touch devices via CSS media query.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Bail out for coarse pointers (touch / tablets) — native cursor is better
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = 0, my = 0;      // mouse target
    let rx = 0, ry = 0;      // ring position (smoothed)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    // Animate the ring with requestAnimationFrame for a smooth trailing effect
    let raf: number;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Grow the ring over interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, .g-item")) {
        ringRef.current?.classList.add("is-hover");
      } else {
        ringRef.current?.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    // Hide native cursor while custom cursor is active
    document.body.style.cursor = "none";
    document.querySelectorAll("a, button").forEach((el) => {
      (el as HTMLElement).style.cursor = "none";
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
      document.querySelectorAll("a, button").forEach((el) => {
        (el as HTMLElement).style.cursor = "";
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
