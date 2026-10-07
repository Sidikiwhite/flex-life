import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

const FEATURES = [
  "Sites sur-mesure conçus autour de votre histoire",
  "Designs élégants avec animations fluides",
  "Hébergement, maintenance et mises à jour selon la formule choisie",
  "Interface intuitive et responsive sur tous les écrans",
];

const IMAGES = [
  "/assets/images/calin.jpeg",
  "/assets/images/diplome-2.jpeg",
  "/assets/images/diplome.jpeg",
  "/assets/images/enterement.jpeg",
  "/assets/images/mariage.jpeg",
  "/assets/images/naissance.jpeg",
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
        <h2
          className="reveal reveal-delay-1"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "none", margin: "16px 0 12px" }}
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
              qui raconte votre histoire avec un style distinctif et
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

          {/* Premium visual with Slider */}
          <div className="reveal reveal-delay-3" style={{ animation: "floaty 6s ease-in-out infinite" }}>
            <div className="holo-card" style={{ position: 'relative' }}>
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

              {/* Mascot Integration: Focused posture */}
              {/* Mascot removed as per premium brand guidelines */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
