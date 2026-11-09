import { Baby, Cake, Flame, Globe, Heart, type LucideIcon } from "lucide-react";

/**
 * Catalogue de templates
 * ----------------------
 * Source de vérité unique pour les catégories et les templates.
 *
 * Pour ajouter un template, complétez son tableau `templates` :
 *
 * {
 *   id: "mariage-elegance",
 *   name: "Élégance",
 *   description: "Un template classique et raffiné.",
 *   thumbnail: "/demos/mariage-elegance/preview.jpg",
 *   href: "/demos/mariage-elegance/index.html",
 *   tags: ["Classique", "Élégant"],
 * }
 *
 * L'identifiant `id` d'une catégorie doit correspondre à celui de la carte
 * service dans `Services.tsx` (weddings, birthdays, etc.).
 */
export interface TemplateItem {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  href?: string;
  tags?: string[];
}

export interface TemplateCategory {
  id: string;
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  /** Active la navigation depuis la carte service vers cette catégorie. */
  demoPageEnabled: boolean;
  templates: TemplateItem[];
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "weddings",
    slug: "mariage",
    label: "Mariage",
    shortLabel: "Mariage",
    description:
      "Des faire-part, sites et expériences numériques pensés pour les couples qui veulent marquer leur union d'une empreinte unique.",
    icon: Heart,
    demoPageEnabled: true,
    templates: [
      {
        id: "mariage-elegance",
        name: "Élégance",
        description:
          "Un site de mariage romantique et raffiné : compte à rebours, histoire du couple, programme, informations pratiques, galerie et formulaire de réponse.",
        thumbnail: "/demos/mariage-elegance/preview.jpg",
        href: "/demos/mariage-elegance/index.html",
        tags: ["Ivoire & or", "Classique", "RSVP"],
      },
      {
        id: "mariage-boheme",
        name: "Bohème Sauvage",
        description:
          "Template authentique et naturel pour un mariage en pleine nature. Timeline narrative, détails pratiques, formulaire RSVP et palette terre cuite & sauge.",
        thumbnail: "/demos/mariage-boheme/preview.jpg",
        href: "/demos/mariage-boheme/index.html",
        tags: ["Nature", "Terre cuite", "Éditorial"],
      },
      {
        id: "mariage-minuit",
        name: "Minuit à Paris",
        description:
          "Élégance urbaine et sophistiquée pour un mariage nocturne. Design noir & or, timeline séquentielle, typographie Garamond, atmosphère mystérieuse.",
        thumbnail: "/demos/mariage-minuit/preview.jpg",
        href: "/demos/mariage-minuit/index.html",
        tags: ["Urbain", "Noir & or", "Sophistiqué"],
      },
      {
        id: "mariage-jardin",
        name: "Jardin d'Éden",
        description:
          "Template botanique luxuriant pour un mariage en serre ou jardin. Palette émeraude & terracotta, galerie photo, animations végétales, programme détaillé.",
        thumbnail: "/demos/mariage-jardin/preview.jpg",
        href: "/demos/mariage-jardin/index.html",
        tags: ["Botanique", "Émeraude", "Luxuriant"],
      },
      {
        id: "mariage-rivage",
        name: "Rivage Méditerranéen",
        description:
          "Légèreté lumineuse pour un mariage en bord de mer. Bleu azur & sable doré, vague SVG, timeline maritime, design aéré et lumineux.",
        thumbnail: "/demos/mariage-rivage/preview.jpg",
        href: "/demos/mariage-rivage/index.html",
        tags: ["Mer", "Azur", "Lumineux"],
      },
    ],
  },
  {
    id: "birthdays",
    slug: "anniversaire",
    label: "Anniversaire",
    shortLabel: "Anniversaire",
    description:
      "Des univers ludiques et immersifs pour célébrer chaque année comme il se doit.",
    icon: Cake,
    demoPageEnabled: true,
    templates: [],
  },
  {
    id: "baptisms",
    slug: "baptemes-naissances",
    label: "Baptêmes & naissances",
    shortLabel: "Naissance",
    description:
      "Des pages tendres et lumineuses pour accueillir et partager les plus beaux débuts.",
    icon: Baby,
    demoPageEnabled: false,
    templates: [],
  },
  {
    id: "commemorations",
    slug: "commemorations",
    label: "Commémorations",
    shortLabel: "Commémoration",
    description:
      "Des espaces sobres et respectueux pour honorer une mémoire et rassembler les proches.",
    icon: Flame,
    demoPageEnabled: false,
    templates: [],
  },
  {
    id: "special",
    slug: "evenements-speciaux",
    label: "Événements spéciaux",
    shortLabel: "Événements",
    description:
      "Galas, festivals, retrouvailles : des expériences digitales à la hauteur de vos moments d'exception.",
    icon: Globe,
    demoPageEnabled: false,
    templates: [],
  },
];

export function getCategoryBySlug(slug?: string): TemplateCategory | undefined {
  return TEMPLATE_CATEGORIES.find((category) => category.slug === slug);
}

export function getCategoryByServiceId(serviceId: string): TemplateCategory | undefined {
  return TEMPLATE_CATEGORIES.find((category) => category.id === serviceId);
}

/**
 * Retourne le chemin de la page templates pour une carte service,
 * ou `null` si la catégorie n'est pas encore ouverte à la navigation.
 */
export function getTemplatePath(serviceId: string): string | null {
  const category = getCategoryByServiceId(serviceId);
  if (!category || !category.demoPageEnabled) return null;
  return `/templates/${category.slug}`;
}
