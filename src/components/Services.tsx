import { useEffect, useRef, useState } from "react";
import { Cake, Heart, Baby, Flame, Globe, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getTemplatePath } from "../data/templates";

const SERVICES = [
  {
    id: 'weddings',
    icon: Heart,
    title: "Mariage",
    desc: "Soyez le couple qui change la donne ! Offrez-vous un portail numérique unique : cartes d'invitation stylées, enregistrement fluide des invités, médiathèque partagée et bien plus encore.",
    image: "/assets/images/mariage.jpeg",
  },
  {
    id: 'baptisms',
    icon: Baby,
    title: "Baptêmes & naissances",
    desc: "Célébrez l'arrivée d'une nouvelle vie avec un site tendre et moderne, conçu pour partager ce bonheur en famille.",
    image: "/assets/images/naissance.jpeg",
  },
  {
    id: 'birthdays',
    icon: Cake,
    title: "Anniversaires",
    desc: "Marquez le coup avec une expérience immersive : compte à rebours, livret d'or et souvenirs interactifs.",
    image: "/assets/images/anniverssaire.jpeg",
  },
  {
    id: 'commemorations',
    icon: Flame,
    title: "Commémorations",
    desc: "Un espace solennel et respectueux pour honorer une mémoire, rassembler les témoignages et partager des hommages.",
    image: "/assets/images/enterement.jpeg",
  },
  {
    id: 'special',
    icon: Globe,
    title: "Événements spéciaux",
    desc: "Galas, festivals ou retrouvailles : nous concevons l'architecture digitale parfaite pour vos moments d'exception.",
    image: "/assets/images/calin.jpeg",
  },
];

/**
 * Services
 * --------
 * Grid of la carte services.
 */
export default function Services() {
  const [activeServices, setActiveServices] = useState<boolean[]>(new Array(SERVICES.length).fill(false));
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Modale « démos indisponibles » : fermeture via Échap + blocage du scroll
  useEffect(() => {
    if (!showToast) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowToast(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [showToast]);

  useEffect(() => {
    const container = dotsContainerRef.current;
    const dots = dotRefs.current.filter((dot): dot is HTMLSpanElement => dot !== null);
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const movers = dots.map((element, index) => ({
      element,
      x: element.offsetLeft,
      y: element.offsetTop,
      angle: index * 2.399,
      speed: 6 + ((index * 7.13) % 8),
      phase: index * 1.731,
      phaseB: index * 2.417,
      driftRateA: 0.00011 + (index % 7) * 0.000021,
      driftRateB: 0.000043 + (index % 11) * 0.000009,
      driftAmountA: 0.13 + (index % 4) * 0.04,
      driftAmountB: 0.06 + (index % 6) * 0.02,
    }));

    let frameId = 0;
    let previousTime = 0;
    const animate = (time: number) => {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      const width = container.clientWidth;
      const height = container.clientHeight;

      movers.forEach((mover) => {
        const drift = Math.sin(time * mover.driftRateA + mover.phase) * mover.driftAmountA
          + Math.sin(time * mover.driftRateB + mover.phaseB) * mover.driftAmountB;
        mover.angle += drift * delta;
        mover.x = (mover.x + Math.cos(mover.angle) * mover.speed * delta + width) % width;
        mover.y = (mover.y + Math.sin(mover.angle) * mover.speed * delta + height) % height;
        mover.element.style.transform = `translate3d(${mover.x - mover.element.offsetLeft}px, ${mover.y - mover.element.offsetTop}px, 0)`;
      });

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <section id="services" className="section services-section">
        <div ref={dotsContainerRef} className="services-bg-dots" aria-hidden="true">
          {Array.from({ length: 42 }).map((_, index) => (
            <span
              key={index}
              className="services-dot"
              ref={(element) => { dotRefs.current[index] = element; }}
              style={{
                left: `${(index * 11 + 7) % 100}%`,
                top: `${(index * 15 + 9) % 100}%`,
              }}
            />
          ))}
        </div>
        <div className="container">
          <h2
            className="reveal reveal-delay-1"
            style={{ fontSize: "clamp(2.3rem, 4vw, 3.2rem)", textTransform: "none", margin: "16px 0 12px", lineHeight: 1.2, color: "#111111" }}
          >
            Nos <span style={{ color: "#8d2d4d", textShadow: "0 0 16px rgba(212, 167, 124, 0.42)" }}>expériences</span> créatives
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{ color: "#111111", maxWidth: 700, marginBottom: 50, fontSize: "1.2rem", lineHeight: 1.8 }}
          >
            Chaque événement mérite un site à son image. Voici ce que nous
            pouvons concevoir pour vous, entièrement sur-mesure.
          </p>

          <div className="services-grid">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const isActive = activeServices[i];
              return (
                <article
                  className={`card service-card reveal reveal-delay-2${isActive ? " is-active" : ""}`}
                  key={i}
                  // Pas de onClick sur l'article pour mobile - seulement le bouton gère les clics
                >
                  <div className="service-card-image">
                    <img
                      src={s.image}
                      alt={s.title}
                    />
                    <button
                      type="button"
                      className="service-card-trigger"
                      aria-label={`${isActive ? "Masquer" : "Découvrir"} ${s.title}`}
                      aria-expanded={isActive}
                      onClick={(e) => {
                        // Empêcher la propagation pour éviter le double déclenchement
                        e.stopPropagation();
                        const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
                        if (isTouch) {
                          // Sur mobile : une seule carte ouverte à la fois.
                          // Ouvrir une carte ferme automatiquement les autres ;
                          // recliquer sur la carte active la referme.
                          setActiveServices((previous) =>
                            previous.map((_, index) =>
                              index === i ? !previous[i] : false
                            )
                          );
                        }
                      }}
                    />
                  </div>

                  <div
                    className="service-card-content"
                    onClick={(e) => {
                      // Ne pas refermer si le clic vient d'un bouton ou d'un lien
                      if ((e.target as HTMLElement).closest("a, button")) return;
                      const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
                      if (isTouch) {
                        // Re-clic sur la zone de la carte : fermer toutes les cartes
                        setActiveServices((previous) =>
                          previous.map(() => false)
                        );
                      }
                    }}
                  >
                    <div className="icon"><Icon size={28} /></div>
                    <h3>{s.title}</h3>
                    <p>
                      {s.desc}
                    </p>
                    <div className="flex flex-col gap-2">
                      <a className="btn btn-primary service-card-order" href="#contact">
                        Commander
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const templatePath = getTemplatePath(s.id);
                          if (templatePath) {
                            navigate(templatePath);
                          } else {
                            setShowToast(true);
                          }
                        }}
                        className="btn btn-primary service-card-demos"
                        style={{ backgroundColor: 'black', color: '#FFF9F5', border: '1px solid rgba(255,255,255,0.2)' }}
                      >
                        Voir démos
                      </button>

                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {showToast && (
        <div
          className="demo-modal-overlay"
          onClick={() => setShowToast(false)}
        >
          <div
            className="demo-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            aria-describedby="demo-modal-text"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="demo-modal-icon" aria-hidden="true">
              <Sparkles size={34} />
            </div>
            <h3 id="demo-modal-title" className="demo-modal-title">
              Modèles non disponibles
            </h3>
            <p id="demo-modal-text" className="demo-modal-text">
              Nos modèles ne sont pas disponibles pour le moment. Revenez bientôt
              pour découvrir nos nouvelles créations.
            </p>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="btn btn-primary"
              autoFocus
            >
              D'accord
            </button>
          </div>
        </div>
      )}
    </>
  );
}
