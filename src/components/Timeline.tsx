import { useState, useEffect } from "react";
import { Rocket, Palette, Code2, Heart } from "lucide-react";

const STEPS = [
  {
    icon: Heart,
    year: "Étape 01 — Confidences",
    title: "On s'écoute",
    desc: "Un moment privilégié pour partager vos rêves, vos souvenirs et vos envies. Nous prenons le temps de comprendre l'âme de votre événement.",
  },
  {
    icon: Palette,
    year: "Étape 02 — Inspiration",
    title: "On imagine ensemble",
    desc: "Comme un croquis poétique, nous dessinons l'univers visuel de votre projet. Une palette de couleurs et de formes qui vous ressemble.",
  },
  {
    icon: Code2,
    year: "Étape 03 — Création",
    title: "On façonne",
    desc: "Avec soin et précision, nous tissons chaque page de votre site. Chaque détail est pensé pour être un cocon accueillant pour vos invités.",
  },
  {
    icon: Rocket,
    year: "Étape 04 — Éclosion",
    title: "On dévoile",
    desc: "Le moment tant attendu. Votre portail s'ouvre au monde avec douceur, prêt à partager vos émotions et à recueillir vos souvenirs.",
  },
];

function SurpriseEffect() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="timeline-surprise" aria-hidden="true">
      {[...Array(30)].map((_, i) => (
        <span
          key={i}
          className="timeline-surprise-dot"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ["#d4a373", "#f5f5f0", "#ffccbc"][Math.floor(Math.random() * 3)],
            animationDuration: `${Math.random() * 2 + 1}s`,
            opacity: Math.random(),
          }}
        />
      ))}
    </div>
  );
}

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="parcours" className="section pb-40">
      <div className="container timeline-shell">
        <h2 className="reveal reveal-delay-1 timeline-title">
          Un chemin <span>doux</span> vers votre projet
        </h2>

        <div className="timeline" aria-label="Parcours de création du projet">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeIndex === index;
            const isLast = index === STEPS.length - 1;
            const isEven = index % 2 === 0;

            return (
              <article
                key={step.title}
                className={`timeline-item ${isEven ? "is-even" : "is-odd"} ${isLast ? "is-last" : ""} ${isActive ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(0)}
                onClick={() => setActiveIndex(index)}
              >
                {!isLast && (
                  <div className="timeline-card">
                    <div className="timeline-icon" aria-hidden="true">
                      <Icon size={24} />
                    </div>
                    <div className="timeline-copy">
                      <div className="tl-year">{step.year}</div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                )}

                <div className="timeline-node" aria-hidden="true" />

                {isLast && (
                  <div className="timeline-card timeline-card-center">
                    <div className="timeline-icon timeline-icon-center" aria-hidden="true">
                      <Icon size={28} />
                    </div>
                    <div className="timeline-copy timeline-copy-center">
                      <div className="tl-year">{step.year}</div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                    {isActive && <SurpriseEffect />}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
