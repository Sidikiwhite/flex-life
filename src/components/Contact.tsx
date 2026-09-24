import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  event: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const INFO = [
  { icon: Mail, title: "Email", value: "ghostgolem25@gmail.com" },
  { icon: Phone, title: "Téléphone", value: "+225 05 04 81 81 48" },
  { icon: MapPin, title: "modeste", value: "grand bassam cote d ivoire" },
];

/**
 * Contact
 * -------
 * Contact form with client-side validation. On submit it validates each
 * field, shows inline errors, and simulates an async send with a success
 * confirmation (a real API endpoint could be plugged in).
 */
export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", event: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  // Simple validation rules
  const validate = (values: FormState): Errors => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Veuillez indiquer votre nom.";
    if (!values.email.trim()) {
      e.email = "Votre email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.email = "Adresse email invalide.";
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      e.message = "Un message d'au moins 10 caractères est requis.";
    }
    return e;
  };

  const handleChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k as keyof Errors]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSending(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      setSent(true);
    } catch (err) {
      console.error(err);
      setErrors({ message: "Une erreur est survenue. Veuillez réessayer plus tard." });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <section id="contact" className="section">
        <div className="container">
          <span className="eyebrow reveal">Contact / Transmission</span>
          <h2
            className="reveal reveal-delay-1"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "uppercase", margin: "16px 0 50px" }}
          >
            Prenons <span className="neon-text">contact</span>
          </h2>
          <div className="form-success reveal visible" style={{ maxWidth: 640, margin: "0 auto" }}>
            <CheckCircle2 size={44} style={{ margin: "0 auto 16px" }} />
            <h3>Message envoyé !</h3>
            <p style={{ fontFamily: "Space Grotesk", color: "var(--text-muted)", marginTop: 10, fontWeight: 400 }}>
              Merci {form.name.split(" ")[0]} ! Notre équipe vous répondra sous 24h.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <span className="eyebrow reveal">Contact / Transmission</span>
        <h2
          className="reveal reveal-delay-1"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "uppercase", margin: "16px 0 50px" }}
        >
          Prenons <span className="neon-text">contact</span>
        </h2>

        <div className="contact-grid">
          {/* Form */}
          <form className="card reveal reveal-delay-2" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="c-name">Nom & prénom</label>
              <input
                id="c-name" type="text" placeholder="Jean Dupont" value={form.name}
                onChange={handleChange("name")} className={errors.name ? "error" : ""}
                aria-invalid={!!errors.name}
              />
              {errors.name && <div className="error-msg" role="alert">{errors.name}</div>}
            </div>

            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email" type="email" placeholder="jean@email.fr" value={form.email}
                onChange={handleChange("email")} className={errors.email ? "error" : ""}
                aria-invalid={!!errors.email}
              />
              {errors.email && <div className="error-msg" role="alert">{errors.email}</div>}
            </div>

            <div className="field">
              <label htmlFor="c-event">Type d'événement</label>
              <input
                id="c-event" type="text" placeholder="Mariage / Baptême / Anniversaire…"
                value={form.event} onChange={handleChange("event")}
              />
            </div>

            <div className="field">
              <label htmlFor="c-message">Votre projet</label>
              <textarea
                id="c-message" placeholder="Décrivez votre événement et vos envies…"
                value={form.message} onChange={handleChange("message")}
                className={errors.message ? "error" : ""} aria-invalid={!!errors.message}
              />
              {errors.message && <div className="error-msg" role="alert">{errors.message}</div>}
            </div>

            <button className="btn btn-primary" type="submit" disabled={sending} style={{ width: "100%", justifyContent: "center", opacity: sending ? 0.6 : 1 }}>
              <Send size={18} /> {sending ? "Envoi en cours…" : "Envoyer le message"}
            </button>
            <div className="form-note">
              En envoyant, vous acceptez notre politique de confidentialité.
            </div>
          </form>

          {/* Contact info */}
          <div className="info-list reveal reveal-delay-3">
            {INFO.map((it, i) => {
              const Icon = it.icon;
              return (
                <div className="info-row" key={i}>
                  <div className="info-icon"><Icon size={20} /></div>
                  <div>
                    <h4>{it.title}</h4>
                    <p>{it.value}</p>
                  </div>
                </div>
              );
            })}
            <div className="info-row">
              <div className="info-icon"><Send size={20} /></div>
              <div>
                <h4>Disponibilité</h4>
                <p>Réponse sous 24h, 7j/7 — devis gratuit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
