const WORKS = [
  { src: "siteweb/cyberpunk-react-business-website/medias/WhatsApp Image 2026-08-29 at 03.51.31 (1).jpeg", title: "Mariage L. & A.", tag: "Site de mariage" },
  { src: "https://picsum.photos/seed/bapteme/800/600", title: "Baptême d'Ella", tag: "Baptême" },
  { src: "https://picsum.photos/seed/jubile/800/600", title: "70 ans de Grand-Père", tag: "Anniversaire" },
  { src: "https://picsum.photos/seed/gala/800/600", title: "Gala de charité", tag: "Événement" },
  { src: "https://picsum.photos/seed/commem/800/600", title: "Hommage M. Dupont", tag: "Commémoration" },
  { src: "https://picsum.photos/seed/soiree/800/600", title: "Soirée retrouvailles", tag: "Événement" },
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
