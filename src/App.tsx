import { useReveal } from "./hooks/useReveal";
import { useTheme } from "./hooks/useTheme";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
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
import TemplateGallery from "./pages/templates/TemplateGallery";
import DemoPlaceholder from "./pages/templates/DemoPlaceholder";
import Demos from "./pages/Demos";
import JungleBirthday from "./pages/templates/birthdays/demos/children/JungleBirthday/JungleBirthday.tsx";
import SpaceBirthday from "./pages/templates/birthdays/demos/children/SpaceBirthday/SpaceBirthday.tsx";
import MagicGrimoireBirthday from "./pages/templates/birthdays/demos/children/MagicGrimoireBirthday/MagicGrimoireBirthday.tsx";

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
    <Router>
      <div ref={pageRef}>
        {/* Decorative neon cursor */}
        <CustomCursor />

        {/* Fixed navigation (hamburger only) */}
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

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
          <Route path="/demos/birthdays/jungle" element={<JungleBirthday />} />
          <Route path="/demos/birthdays/space" element={<SpaceBirthday />} />
          <Route path="/demos/birthdays/grimoire" element={<MagicGrimoireBirthday />} />

          <Route path="/templates/:category" element={<TemplateGalleryWrapper />} />
          <Route path="/templates/:category/demo/:themeId" element={<DemoWrapper />} />
        </Routes>

        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

function TemplateGalleryWrapper() {
  const { category } = useParams();
  const categoryMap = {
    birthdays: "Anniversaire",
    weddings: "Mariage",
    corporate: "Entreprise",
    baptisms: "Baptême",
    parties: "Fête"
  };
  return <TemplateGallery category={category} title={categoryMap[category as keyof typeof categoryMap] || "Événement"} />;
}

function DemoWrapper() {
  const { themeId } = useParams();
  return <DemoPlaceholder themeId={themeId} />;
}
