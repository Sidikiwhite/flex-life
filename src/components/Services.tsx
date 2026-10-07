import { useEffect, useRef, useState } from "react";
import { Cake, Heart, Baby, Flame, Globe } from "lucide-react";

const SERVICES = [
  {
    icon: Heart,
    title: "Sites de mariage",
    desc: "Soyez le couple qui change la donne ! Offrez-vous un portail numérique unique : cartes d'invitation stylées, enregistrement fluide des invités, médiathèque partagée et bien plus encore.",
    image: "/assets/images/mariage.jpeg",
  },
  {
    icon: Baby,
    title: "Baptêmes & naissances",
    desc: "Célébrez l'arrivée d'une nouvelle vie avec un site tendre et moderne, conçu pour partager ce bonheur en famille.",
    image: "/assets/images/naissance.jpeg",
  },
  {
    icon: Cake,
    title: "Anniversaires",
    desc: "Marquez le coup avec une expérience immersive : compte à rebours, livret d'or et souvenirs interactifs.",
    image: "/assets/images/anniverssaire.jpeg",
  },
  {
    icon: Flame,
    title: "Commémorations",
    desc: "Un espace solennel et respectueux pour honorer une mémoire, rassembler les témoignages et partager des hommages.",
    image: "/assets/images/enterement.jpeg",
  },
  {
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
  const [activeService, setActiveService] = useState<number | null>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
            const isActive = activeService === i;
            return (
              <article
                className={`card service-card reveal reveal-delay-2${isActive ? " is-active" : ""}`}
                key={i}
                onClick={(event) => {
                  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
                  const clickedControl = event.target instanceof Element && event.target.closest("a, button");
                  if (isTouch && isActive && !clickedControl) setActiveService(null);
                }}
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
                    onClick={() => setActiveService(isActive ? null : i)}
                  />
                </div>

                <div className="service-card-content">
                  <div className="icon"><Icon size={28} /></div>
                  <h3>{s.title}</h3>
                  <p>
                    {s.desc}
                  </p>
                  <a className="btn btn-primary service-card-order" href="#contact">
                    Commander
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
