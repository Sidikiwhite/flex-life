import { useReveal } from "./hooks/useReveal";
import { useTouchOptimization } from "./hooks/useTouchOptimization";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import Templates from "./pages/Templates";
import DemoViewer from "./pages/DemoViewer";

/**
 * AppContent
 * ----------
 * Inner component that has access to useLocation for route-aware reveal hook.
 */
function AppContent() {
  const location = useLocation();
  
  // Scroll-reveal observer for the page (reinitializes on route change)
  const pageRef = useReveal(location.pathname);
  
  // Mobile touch optimization
  useTouchOptimization();

  return (
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

        <Route path="/templates" element={<Templates />} />
        <Route path="/templates/:slug" element={<Templates />} />
        <Route path="/demo/:demoId" element={<DemoViewer />} />
        <Route path="/demos" element={<Navigate to="/templates" replace />} />
      </Routes>

      <Footer />
      <BackToTop />
    </div>
  );
}

/**
 * App
 * ---
 * Root component of the one-page Flex-Code / Flex-Life website.
 * Composes all sections in a single scrolling layout with a
 * scroll-reveal observer wrapping the whole page.
 */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


