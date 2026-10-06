import { useState, useEffect, useRef } from "react";
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
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ["#d4a373", "#f5f5f0", "#ffccbc"][Math.floor(Math.random() * 3)],
            animationDuration: `${Math.random() * 2 + 1}s`,
            opacity: Math.random(),
          }}
        />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce">

      </div>
    </div>
  );
}

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section id="parcours" className="section pb-40" style={{ backgroundColor: "var(--bg-soft, #faf9f6)", color: "#4a4a4a", transition: "all 0.5s ease", position: "relative" }}>
      <div className="container">
        <h2
          className="reveal reveal-delay-1"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "none", margin: "16px 0 50px", color: "#2d2d2d", fontWeight: "500" }}
        >
          Un chemin <span style={{ color: "#d4a373", fontStyle: "italic" }}>doux</span> vers votre projet
        </h2>

        <div className="relative max-w-5xl mx-auto mt-20 pb-64">
          {/* Vertical Center Line */}
          <div
            className="absolute left-1/2 top-0 w-0.5 dashed border-l-2 border-dashed"
            style={{ borderColor: "#d4a373", transform: "translateX(-50%)", height: "calc(100% - 300px)" }}
          />

          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = activeIndex === i;
            const isLast = i === STEPS.length - 1;
            const isEven = i % 2 === 0;

            return (
              <div
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                className={`relative flex items-center justify-between mb-48 reveal cursor-pointer ${
                  isLast ? "justify-center" : isEven ? "flex-row-reverse" : "flex-row"
                }`}
                key={i}
                style={{
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                  opacity: isActive ? 1 : 0.6,
                  filter: isActive ? "blur(0px)" : "blur(1px)"
                }}
              >
                {/* Content Side */}
                {!isLast && (
                  <div
                    className={`w-[45%] flex items-start gap-4 ${isEven ? "text-left" : "text-right"}`}
                    style={{ textAlign: isEven ? "left" : "right", flexDirection: isEven ? "row" : "row-reverse" }}
                  >
                    <div className="mt-1 p-3 rounded-xl bg-white shadow-md border border-gray-100 text-[#d4a373] transition-transform duration-300 hover:scale-110" style={{ flexShrink: 0 }}>
                      <Icon size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="tl-year" style={{ color: "#d4a373", fontSize: "0.9rem", fontWeight: "600", marginBottom: "8px" }}>{s.year}</div>
                      <h3 style={{ color: "#2d2d2d", fontSize: isActive ? "1.6rem" : "1.4rem", marginBottom: "12px", fontWeight: "600", transition: "all 0.3s ease" }}>{s.title}</h3>
                      <p style={{ color: "#666", lineHeight: "1.6", transition: "all 0.3s ease" }}>{s.desc}</p>
                    </div>
                  </div>
                )}

                {/* Space for Center Node (Invisible) */}
                <div className="relative z-10" style={{
                  width: "45px",
                  height: "45px",
                  flexShrink: 0
                }}>
                </div>

                {/* Content Side (Mirror for non-last) */}
                {!isLast && (
                  <div className="w-[45%]" />
                )}

                {/* Special case for last item content below the node */}
                {isLast && (
                  <div className="relative mt-12 text-center w-full max-w-md mx-auto flex flex-col items-center">
                    <div className="mb-6 p-4 rounded-full bg-white shadow-lg border border-gray-100 text-[#d4a373] transition-transform duration-300 hover:scale-110">
                      <Icon size={40} />
                    </div>
                    <div className="tl-year" style={{ color: "#d4a373", fontSize: "0.9rem", fontWeight: "600", marginBottom: "8px" }}>{s.year}</div>
                    <h3 style={{ color: "#2d2d2d", fontSize: isActive ? "1.8rem" : "1.6rem", marginBottom: "12px", fontWeight: "600", transition: "all 0.3s ease" }}>{s.title}</h3>
                    <p style={{ color: "#666", lineHeight: "1.6", transition: "all 0.3s ease" }}>{s.desc}</p>
                    {isActive && <SurpriseEffect />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
