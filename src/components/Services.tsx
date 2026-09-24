import { useState } from "react";
import { Cake, Heart, Baby, Flame, Globe, Layers } from "lucide-react";

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
 * Grid of six offer cards with a flip/transition effect:
 * Image by default -> Content on hover/click.
 */
export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <span className="eyebrow reveal">Services / Modules</span>
        <h2
          className="reveal reveal-delay-1"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "uppercase", margin: "16px 0 12px" }}
        >
          Nos <span className="neon-text">modules</span> créatifs
        </h2>
        <p className="reveal reveal-delay-2" style={{ color: "var(--text-muted)", maxWidth: 560, marginBottom: 50 }}>
          Chaque événement mérite un site à son image. Voici ce que nous
          pouvons concevoir pour vous, entièrement sur-mesure.
        </p>

        <div className="services-grid">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                className="card service-card reveal reveal-delay-2 group relative overflow-hidden cursor-pointer"
                key={i}
                style={{ minHeight: "350px" }}
              >
                {/* IMAGE STATE (Default) */}
                <div
                  className="absolute inset-0 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-110 z-10"
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* CONTENT STATE (Hover) */}
                <div
                  className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 z-20 bg-[#f5f5f0] backdrop-blur-md"
                >
                  <div className="icon mb-6 bg-black/5 p-3 rounded-lg w-fit text-black"><Icon size={28} /></div>
                  <h3 className="mb-3 text-2xl font-bold tracking-tight leading-tight text-black" style={{ fontFamily: "var(--font-playfair, serif)" }}>{s.title}</h3>
                  <p className="text-base mb-6 text-gray-700 leading-relaxed font-medium max-w-[80%] mx-auto">
                    {s.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
