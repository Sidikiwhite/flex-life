import { useCallback, useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * useTheme
 * --------
 * Manages the dark/light mode toggle. Persists the user's choice in
 * localStorage and applies the `data-theme` attribute to <html> so the
 * CSS custom properties switch seamlessly.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("fl-theme") as Theme | null;
    return saved ?? "dark";
  });

  // Apply theme to the root element whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fl-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
