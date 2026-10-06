import { useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Combien de temps faut-il pour créer un site événement ?",
    a: "En général, un site complet est livré entre 2 jours et 1 semaines selon la complexité. Pour les projets express, nous proposons une formule accélérée en 7 jours. Le délai exact est confirmé après le premier échange.",
  },
  {
    q: "Ai-je besoin de compétences techniques pour gérer le site ?",
    a: "Absolument pas. Nous nous occupons de tout : création, hébergement, mises à jour et maintenance. Vous recevez un site clé en main, simple à consulter et à partager, sans aucune technicité requise.",
  },
  {
    q: "Les sites sont-ils adaptés aux mobiles et tablettes ?",
    a: "Oui. Chaque projet est conçu mobile-first et testé sur de nombreux appareils. Vos invités profiteront d'une expérience fluide et élégante, qu'ils naviguent sur smartphone, tablette ou ordinateur.",
  },
  {
    q: "Puis-je mettre à jour le contenu après la mise en ligne ?",
    a: "Oui. Selon la formule choisie, nous incluons un nombre d'heures de modification. Vous pouvez demander des changements (photos, textes, galerie) à tout moment, et nous nous en chargeons rapidement.",
  },
  {
    q: "Quel est le tarif d'un site événement ?",
    a: "Le tarif dépend de la formule, du nombre de pages et des fonctionnalités. Nous offrons toujours un devis transparent et sur-mesure après un appel découverte. Contactez-nous pour un chiffrage gratuit.",
  },
];

/**
 * FAQ
 * ---
 * Accessible accordion. Only one item open at a time. Uses aria attributes
 * for expand/collapse semantics and CSS grid max-height transitions.
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((cur) => (cur === i ? null : i));

  return (
    <section id="faq" className="section">
      <div className="container">
        <h2
          className="reveal reveal-delay-1"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "uppercase", margin: "16px 0 40px" }}
        >
          Questions <span className="neon-text">fréquentes</span>
        </h2>

        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={i}>
                <button
                  className="faq-q"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                >
                  <span>{f.q}</span>
                  <Plus className="qicon" size={22} aria-hidden="true" />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className="faq-a"
                  style={{ maxHeight: isOpen ? 500 : 0 }}
                >
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
