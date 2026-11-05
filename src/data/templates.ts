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
    templates: [],
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
