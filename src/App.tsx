import { useReveal } from "./hooks/useReveal";
import { useTheme } from "./hooks/useTheme";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Timeline from "./components/Timeline";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

/**
 * App
 * ---
 * Root component of the one-page Flex-Code / Flex-Life website.
 * Composes all sections in a single scrolling layout with a
 * scroll-reveal observer wrapping the whole page.
 */
export default function App() {
  // Theme state (dark default) + scroll-reveal observer for the page
  const { theme, toggleTheme } = useTheme();
  const pageRef = useReveal();

  return (
    <div ref={pageRef}>
      {/* Decorative neon cursor */}
      <CustomCursor />

      {/* Fixed navigation (hamburger only) */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Scroll-based storytelling sections */}
      <main>
        <Hero />
        <About />
        <Services />
        <Timeline />
        <FAQ />
        <Newsletter />
        <Contact />
      </main>

      {/* Single-line footer */}
      <Footer />

      {/* Floating back-to-top control */}
      <BackToTop />
    </div>
  );
}
