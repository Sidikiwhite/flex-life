const WORKS = [
  { src: "/assets/images/mariage.jpeg", title: "Mariage L. & A.", tag: "Site de mariage" },
  { src: "/assets/images/naissance.jpeg", title: "Baptême d'Ella", tag: "Baptême" },
  { src: "/assets/images/anniverssaire.jpeg", title: "70 ans de Grand-Père", tag: "Anniversaire" },
  { src: "/assets/images/diplome.jpeg", title: "Gala de charité", tag: "Événement" },
  { src: "/assets/images/enterement.jpeg", title: "Hommage M. Dupont", tag: "Commémoration" },
  { src: "/assets/images/calin.jpeg", title: "Soirée retrouvailles", tag: "Événement" },
];

/**
 * Portfolio
 * ---------
 * Hoverable gallery of recent event-site creations.
 */
export default function Portfolio() {
  return (
    <section id="realisations" className="section">
      <div className="container">
        <span className="eyebrow reveal">Réalisations / Portfolio</span>
        <h2
          className="reveal reveal-delay-1"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "uppercase", margin: "16px 0 50px" }}
        >
          Projets <span className="neon-text">récemment</span> déployés
        </h2>

        <div className="gallery-grid">
          {WORKS.map((w, i) => (
            <figure className="g-item reveal reveal-delay-2" key={i}>
              <img src={w.src} alt={w.title} loading="lazy" />
              <figcaption className="g-overlay">
                <h4>{w.title}</h4>
                <span>{w.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
