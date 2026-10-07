import { useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Que comprend la création de mon site événement ?",
    a: "La prestation comprend la conception d'un site personnalisé et adapté aux mobiles. Les pages et fonctionnalités (comme l'invitation, les réponses des invités, la galerie ou le livre d'or) sont définies selon votre événement. Le devis précise le délai, l'hébergement, le suivi et les modifications inclus.",
  },
  {
    q: "Combien de temps faut-il pour créer un site événement ?",
    a: "Le délai dépend du contenu, du nombre de pages et des fonctionnalités retenues. Il est confirmé dans le devis avant le démarrage du projet. Une formule express peut être proposée selon les disponibilités.",
  },
  {
    q: "Ai-je besoin de compétences techniques pour gérer le site ?",
    a: "Aucune compétence technique n'est nécessaire pour consulter et partager le site. L'hébergement, les mises à jour et la maintenance sont pris en charge selon la formule retenue ; leurs modalités sont détaillées dans le devis.",
  },
  {
    q: "Les sites sont-ils adaptés aux mobiles et tablettes ?",
    a: "Oui. Chaque projet est conçu mobile-first et testé sur de nombreux appareils. Vos invités profiteront d'une expérience fluide et élégante, qu'ils naviguent sur smartphone, tablette ou ordinateur.",
  },
  {
    q: "Puis-je mettre à jour le contenu après la mise en ligne ?",
    a: "Les modifications après la mise en ligne (textes, photos ou galerie) dépendent de la formule choisie. Le devis indique précisément le volume de modifications inclus et les conditions pour demander des changements supplémentaires.",
  },
  {
    q: "Quel est le tarif d'un site événement ?",
    a: "Le tarif dépend du nombre de pages, des fonctionnalités et du niveau d'accompagnement souhaité. Vous recevez un devis détaillé avant le début du projet, avec le périmètre et les services inclus. Contactez-nous pour en discuter.",
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
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "none", margin: "16px 0 40px" }}
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
