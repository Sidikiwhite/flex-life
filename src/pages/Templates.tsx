import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  TEMPLATE_CATEGORIES,
  getCategoryBySlug,
  type TemplateCategory,
} from "../data/templates";

/**
 * Templates
 * ---------
 * Catalogue des modèles par catégorie.
 *
 * - `/templates`          → vue d'ensemble des catégories
 * - `/templates/:slug`    → templates d'une catégorie
 */
export default function Templates() {
  const { slug } = useParams<{ slug?: string }>();
  const activeCategory = slug ? getCategoryBySlug(slug) : undefined;
  const notFound = Boolean(slug) && !activeCategory;

  // La navigation depuis les cartes services peut arriver avec un scroll bas.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="templates-page">
      <div className="container">
        <div className="templates-topbar">
          <Link to="/" className="templates-back">
            <ArrowLeft size={18} aria-hidden="true" />
            Retour au site
          </Link>
          <span className="templates-breadcrumb">Templates</span>
        </div>

        <header className="templates-hero">
          <span className="templates-eyebrow">L'atelier Flex-Life</span>
          <h1 className="templates-title">
            {activeCategory ? (
              <>
                Les templates <span>{activeCategory.label}</span>
              </>
            ) : notFound ? (
              <>
                Catégorie <span>introuvable</span>
              </>
            ) : (
              <>
                Toutes nos <span>catégories</span>
              </>
            )}
          </h1>
          <p className="templates-subtitle">
            {activeCategory
              ? activeCategory.description
              : notFound
                ? "Cette catégorie de templates n'existe pas ou n'est plus disponible."
                : "Choisissez une catégorie pour découvrir les templates disponibles."}
          </p>
          <p className="templates-disclaimer">
            💡 Les templates sont présentés à titre indicatif et peuvent être entièrement personnalisés selon vos besoins.
          </p>
        </header>

        <nav className="templates-tabs" aria-label="Catégories de templates">
          <Link
            to="/templates"
            className={`template-tab${!slug ? " is-active" : ""}`}
            aria-current={!slug ? "page" : undefined}
          >
            <Layers size={15} aria-hidden="true" />
            Toutes
          </Link>

          {TEMPLATE_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = category.slug === slug;
            return (
              <Link
                key={category.id}
                to={`/templates/${category.slug}`}
                className={`template-tab${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={15} aria-hidden="true" />
                {category.shortLabel}
              </Link>
            );
          })}
        </nav>

        {notFound ? (
          <div className="template-empty">
            <div className="template-empty-icon" aria-hidden="true">
              <Sparkles size={30} />
            </div>
            <h2>Catégorie introuvable</h2>
            <p>
              Cette catégorie de templates n'existe pas ou n'est plus
              disponible.
            </p>
            <div className="template-empty-actions">
              <Link to="/templates" className="btn btn-primary">
                Voir toutes les catégories
              </Link>
            </div>
          </div>
        ) : activeCategory ? (
          <CategoryView category={activeCategory} />
        ) : (
          <div className="template-category-grid">
            {TEMPLATE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const count = category.templates.length;
              return (
                <Link
                  key={category.id}
                  to={`/templates/${category.slug}`}
                  className="template-category-card"
                >
                  <div className="template-category-icon" aria-hidden="true">
                    <Icon size={24} />
                  </div>
                  <h2>{category.label}</h2>
                  <p>{category.description}</p>
                  <span className="template-category-count">
                    {count > 0
                      ? `${count} template${count > 1 ? "s" : ""}`
                      : "Bientôt disponible"}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="template-category-arrow"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryView({ category }: { category: TemplateCategory }) {
  const navigate = useNavigate();

  if (category.templates.length === 0) {
    return (
      <div className="template-empty">
        <div className="template-empty-icon" aria-hidden="true">
          <Sparkles size={30} />
        </div>
        <h2>Les templates {category.label} arrivent bientôt</h2>
        <p>
          Nous préparons une sélection de modèles pour cette catégorie. Revenez
          très vite pour les découvrir.
        </p>
        <div className="template-empty-actions">
          <Link to="/#contact" className="btn btn-primary">
            Nous contacter
          </Link>
          <Link to="/templates" className="btn btn-ghost">
            Autres catégories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="templates-grid">
      {category.templates.map((template) => (
        <article className="template-card" key={template.id}>
          {template.thumbnail && (
            <img
              src={template.thumbnail}
              alt={`Aperçu du template ${template.name}`}
              className="template-thumb"
              loading="lazy"
            />
          )}
          <div className="template-card-body">
            <h2>{template.name}</h2>
            <p>{template.description}</p>

            {template.tags && template.tags.length > 0 && (
              <div className="template-tags">
                {template.tags.map((tag) => (
                  <span className="template-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {template.href ? (
              <button
                onClick={() => navigate(`/demo/${template.id}`)}
                className="btn btn-primary"
              >
                Voir le template
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            ) : (
              <span className="template-soon">Aperçu bientôt disponible</span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
