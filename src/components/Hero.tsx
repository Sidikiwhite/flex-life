import ParticleCanvas from "./ParticleCanvas";

/**
 * Hero
 * ----
 * Full-viewport opening section with an animated particle canvas
 * background, a cyber grid overlay, neon headline and key stats.
 */
export default function Hero() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="hero" aria-label="Présentation">
      {/* Animated particle background */}
      <ParticleCanvas />
      {/* Cyber grid overlay */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-content">
        <h1>
          <span className="line">Des expériences</span>
          <span className="line neon-text">digitales</span>
          <span className="line">inoubliables</span>
        </h1>

        <p className="sub">
          Flex-Code / Flex-Life conçoit des sites internet uniques pour vos
          événements les plus importants — mariages, baptêmes, anniversaires,
          commémorations.  animations fluides, zéro compromis.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <a href="#contact" className="btn btn-primary" onClick={scrollTo("contact")}>
            commander un site
          </a>
        </div>

        {/* Key metrics */}
        <div className="hero-stats">
          
          <div className="hero-stat">
            <div className="num">98%</div>
            <div className="lbl">Satisfaction</div>
          </div>
          <div className="hero-stat">
            <div className="num">5★</div>
            <div className="lbl">Notes clients</div>
          </div>
          <div className="hero-stat">
            <div className="num">24/7</div>
            <div className="lbl">Support</div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" aria-hidden="true">
        <div className="mouse"><span className="wheel" /></div>
        défilez
      </div>
    </section>
  );
}
