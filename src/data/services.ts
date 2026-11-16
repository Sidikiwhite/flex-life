import { Baby, Cake, Flame, Globe, Heart, type LucideIcon } from "lucide-react";

/**
 * Services
 * --------
 * Source de vérité des cartes de la section « Nos expériences créatives ».
 *
 * L'identifiant `id` doit correspondre à celui de la catégorie de templates
 * dans `src/data/templates.ts` (weddings, birthdays, etc.).
 */
export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  icon: LucideIcon;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "weddings",
    icon: Heart,
    title: "Mariage",
    desc: "Soyez le couple qui change la donne ! Offrez-vous un portail numérique unique : cartes d'invitation stylées, enregistrement fluide des invités, médiathèque partagée et bien plus encore.",
    image: "/assets/images/mariage.jpeg",
  },
  {
    id: "baptisms",
    icon: Baby,
    title: "Baptêmes & naissances",
    desc: "Célébrez l'arrivée d'une nouvelle vie avec un site tendre et moderne, conçu pour partager ce bonheur en famille.",
    image: "/assets/images/naissance.jpeg",
  },
  {
    id: "birthdays",
    icon: Cake,
    title: "Anniversaires",
    desc: "Marquez le coup avec une expérience immersive : compte à rebours, livret d'or et souvenirs interactifs.",
    image: "/assets/images/anniverssaire.jpeg",
  },
  {
    id: "commemorations",
    icon: Flame,
    title: "Commémorations",
    desc: "Un espace solennel et respectueux pour honorer une mémoire, rassembler les témoignages et partager des hommages.",
    image: "/assets/images/enterement.jpeg",
  },
  {
    id: "special",
    icon: Globe,
    title: "Événements spéciaux",
    desc: "Galas, festivals ou retrouvailles : nous concevons l'architecture digitale parfaite pour vos moments d'exception.",
    image: "/assets/images/calin.jpeg",
  },
];

export function getServiceById(id?: string): ServiceItem | undefined {
  if (!id) return undefined;
  return SERVICES.find((service) => service.id === id);
}
