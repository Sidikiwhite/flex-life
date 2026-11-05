import { useReveal } from "./hooks/useReveal";
import { useTouchOptimization } from "./hooks/useTouchOptimization";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Demos from "./pages/Demos";

/**
 * App
 * ---
 * Root component of the one-page Flex-Code / Flex-Life website.
 * Composes all sections in a single scrolling layout with a
 * scroll-reveal observer wrapping the whole page.
 */
export default function App() {
  // Scroll-reveal observer for the page
  const pageRef = useReveal();
  
  // Mobile touch optimization
  useTouchOptimization();

  return (
    <Router>
      <div ref={pageRef}>
        {/* Decorative neon cursor */}
        <CustomCursor />

        {/* Fixed navigation (hamburger only) */}
        <Navbar />

        <Routes>
          <Route path="/" element={
            <main key="home-page">
              <Hero />
              <About />
              <Services />
              <Timeline />
              <FAQ />
              <Newsletter />
              <Contact />
            </main>
          } />

          <Route path="/demos" element={<Demos />} />
        </Routes>

        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}


