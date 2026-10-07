import { useEffect, useState } from "react";

const TITLE_LINES = [
  "Votre événement",
  "Votre univers",
  "Votre souvenir",
];

/**
 * Hero
 * ----
 * Full-viewport opening section.
 * Transforms the previous cyberpunk style into a premium, emotional experience.
 */
export default function Hero() {
  const [activeLine, setActiveLine] = useState<number | null>(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showFinalRow, setShowFinalRow] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setIsExiting(true), 4500),
      window.setTimeout(() => {
        setActiveLine(1);
        setIsExiting(false);
      }, 5000),
      window.setTimeout(() => setIsExiting(true), 9500),
      window.setTimeout(() => {
        setActiveLine(2);
        setIsExiting(false);
      }, 10000),
      window.setTimeout(() => setIsExiting(true), 14500),
      window.setTimeout(() => setShowFinalRow(true), 15000),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="hero" aria-label="Présentation" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div
        className="hero-visual"
      >
        <img
          src="/assets/images/banniere.svg"
          alt="Flex-Life Banner"
        />
      </div>

      <div className="hero-content">
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 className={`hero-title${showFinalRow ? " final-row" : ""}`}>
            {TITLE_LINES.map((line, index) => {
              const isVisible = showFinalRow || activeLine === index;
              return (
                <span
                  key={line}
                  className={`line ${index === 1 ? "line-2" : index === 2 ? "line-3" : "line-1"} ${isVisible ? "is-visible" : ""} ${isVisible && isExiting && !showFinalRow ? "is-exiting" : ""}`}
                >
                  {line}
                </span>
              );
            })}
          </h1>
        </div>

        <p className="sub">
          Nous créons des sites personnalisés pour vos événements : invitations,
          informations pratiques et souvenirs réunis dans un espace unique.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: 'center' }}>
          <a href="#contact" className="btn btn-primary hero-cta" onClick={scrollTo("contact")}>
            Créer mon événement
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="num">100%</div>
            <div className="lbl">Sur mesure</div>
          </div>
          <div className="hero-stat">
            <div className="num">Émotion</div>
            <div className="lbl">Au cœur du design</div>
          </div>
          <div className="hero-stat">
            <div className="num">Unique</div>
            <div className="lbl">Chaque souvenir</div>
          </div>
        </div>
      </div>
    </section>
  );
}
