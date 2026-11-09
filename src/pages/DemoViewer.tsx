import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

/**
 * DemoViewer
 * ----------
 * Page d'affichage d'une démo en iframe avec :
 * - Bouton "Retour à Templates"
 * - Bouton "Choisir ce modèle" qui redirige vers le formulaire
 */
export default function DemoViewer() {
  const { demoId } = useParams<{ demoId: string }>();
  const navigate = useNavigate();
  const [iframeKey, setIframeKey] = useState(0);

  // Recharger l'iframe si le demoId change
  useEffect(() => {
    setIframeKey((prev) => prev + 1);
  }, [demoId]);

  const handleChooseModel = () => {
    // Rediriger vers la page d'accueil avec anchor vers contact
    // et passer l'ID du modèle via le paramètre 'modele'
    window.location.href = `/#contact?modele=${demoId}`;
  };

  const handleBackToTemplates = () => {
    navigate("/templates");
  };

  if (!demoId) {
    return (
      <div className="demo-viewer-error">
        <h1>Démo introuvable</h1>
        <button onClick={handleBackToTemplates} className="btn btn-primary">
          Retour aux templates
        </button>
      </div>
    );
  }

  const demoPath = `/demos/${demoId}/index.html`;

  return (
    <div className="demo-viewer">
      {/* Barre d'actions flottante */}
      <div className="demo-viewer-controls">
        <button
          onClick={handleBackToTemplates}
          className="demo-btn demo-btn-back"
          aria-label="Retour aux templates"
        >
          <ArrowLeft size={18} />
          <span>Retour à Templates</span>
        </button>

        <button
          onClick={handleChooseModel}
          className="demo-btn demo-btn-choose"
          aria-label="Choisir ce modèle"
        >
          <CheckCircle2 size={18} />
          <span>Choisir ce modèle</span>
        </button>
      </div>

      {/* Iframe de la démo */}
      <iframe
        key={iframeKey}
        src={demoPath}
        className="demo-viewer-iframe"
        title={`Démo ${demoId}`}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}
