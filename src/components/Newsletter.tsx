import { useState } from "react";
import { Zap } from "lucide-react";

/**
 * Newsletter
 * ----------
 * Email subscription form with inline validation and a success message.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="newsletter reveal">
          <Zap size={30} style={{ color: "var(--accent)", margin: "0 auto 18px" }} />
          <h2 style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.2rem)" }}>
            Restez <span className="neon-text">inspiré.e</span>
          </h2>
          <p>
            Recevez nos inspirations événementielles, nos nouveautés et nos
            conseils créatifs. Un email par mois, sans spam.
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <input
              type="email" placeholder="votre@email.fr"
              value={email} aria-label="Votre adresse email"
              onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
              className={status === "error" ? "error" : ""}
            />
            <button className="btn btn-primary" type="submit">S'abonner</button>
          </form>
          {status === "error" && <div className="nl-note error" role="alert">Veuillez saisir un email valide.</div>}
          {status === "success" && <div className="nl-note success" role="status">Merci ! Vous êtes inscrit.e à la newsletter.</div>}
        </div>
      </div>
    </section>
  );
}
