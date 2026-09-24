import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

const FEATURES = [
  "Sites sur-mesure conçus autour de votre histoire",
  "Designs modernes avec animations fluides",
  "Hébergement, maintenance et mise à jour inclus",
  "Interface intuitive et responsive sur tous les écrans",
];

const IMAGES = [
  "/medias/calin.jpeg",
  "/medias/diplome-2.jpeg",
  "/medias/diplome.jpeg",
  "/medias/enterement.jpeg",
  "/medias/mariage.jpeg",
  "/medias/naissance.jpeg",
];

/**
 * About
 * -----
 * Presents the agency's identity with an image visual card and a feature
 * list. Wrapped in a scroll-reveal container (see useReveal).
 */
export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="apropos" className="section">
      <div className="container">
        <span className="eyebrow reveal">À propos / Identity</span>
        <h2
          className="reveal reveal-delay-1"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "uppercase", margin: "16px 0 12px" }}
        >
          Nous donnons <span className="neon-text">vie</span> à vos moments
        </h2>

        <div className="about-grid" style={{ marginTop: 50 }}>
          {/* Copy */}
          <div className="about-copy reveal reveal-delay-2">
            <p className="lead">
              Nous transformons vos moments précieux en expériences digitales
              originales, élégantes et mémorables. Chaque projet est une
              exploration créative : nous écoutons, concevons et codons un site
              qui raconte votre histoire avec un style  distinctif et
              des micro-interactions qui captivent vos visiteurs.
            </p>

            <ul className="feature-list">
              {FEATURES.map((f, i) => (
                <li key={i} className="reveal reveal-delay-3">
                  <CheckCircle2 size={20} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Holographic visual with Slider */}
          <div className="reveal reveal-delay-3" style={{ animation: "floaty 6s ease-in-out infinite" }}>
            <div className="holo-card" style={{ position: "relative", overflow: "hidden" }}>
              {IMAGES.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Événement ${index + 1}`}
                  loading="lazy"
                  style={{
                    position: index === 0 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "opacity 1s ease-in-out",
                    opacity: index === currentImageIndex ? 1 : 0,
                    zIndex: index === currentImageIndex ? 1 : 0,
                  }}
                />
              ))}
              <div className="scan" aria-hidden="true" />
              <div className="frame" aria-hidden="true" />
              <span className="corner tl" aria-hidden="true" />
              <span className="corner tr" aria-hidden="true" />
              <span className="corner bl" aria-hidden="true" />
              <span className="corner br" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
