import React from "react";
import { useMobileDetection } from "../hooks/useMobileDetection";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  
  // Options de mise en page responsive
  spacing?: "none" | "xs" | "sm" | "md" | "lg";
  padding?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  
  // Options d'adaptation mobile
  hideOnMobile?: boolean;
  showOnMobileOnly?: boolean;
  mobileSpacing?: boolean;
  
  // Options d'accessibilité
  ariaLabel?: string;
}

/**
 * ResponsiveContainer
 * -------------------
 * Composant conteneur qui s'adapte automatiquement aux différentes tailles d'écran.
 * Gère les espacements, les largeurs maximales et les comportements d'affichage responsive.
 */
export default function ResponsiveContainer({
  children,
  className = "",
  spacing = "md",
  padding = true,
  maxWidth = "lg",
  hideOnMobile = false,
  showOnMobileOnly = false,
  mobileSpacing = true,
  ariaLabel
}: ResponsiveContainerProps) {
  const { breakpoint } = useMobileDetection();
  
  // Générer les classes de base
  const baseClasses = "w-full mx-auto";
  
  // Gérer les espacements
  const spacingClasses = {
    none: "",
    xs: "space-y-2",
    sm: "space-y-4",
    md: "space-y-6",
    lg: "space-y-8",
  }[spacing];
  
  // Gérer le padding
  const paddingClasses = padding ? "px-4 sm:px-6 lg:px-8" : "";
  
  // Gérer la largeur maximale
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md", 
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full",
  }[maxWidth];
  
  // Gérer l'affichage responsive
  const responsiveClasses = hideOnMobile && breakpoint.xs ? "hidden" : "";
  const mobileOnlyClasses = showOnMobileOnly && !breakpoint.xs ? "hidden" : "";
  
  // Gérer les espacements mobiles spécifiques
  const mobileSpacingClass = mobileSpacing && breakpoint.xs ? "px-3" : "";
  
  // Combiner toutes les classes
  const combinedClasses = [
    baseClasses,
    spacingClasses,
    paddingClasses,
    maxWidthClasses,
    responsiveClasses,
    mobileOnlyClasses,
    mobileSpacingClass,
    className
  ].filter(Boolean).join(" ");
  
  return (
    <div 
      className={combinedClasses}
      aria-label={ariaLabel}
      role={ariaLabel ? "region" : undefined}
    >
      {children}
    </div>
  );
}

/**
 * ResponsiveGrid
 * --------------
 * Composant de grille qui s'adapte automatiquement aux différentes tailles d'écran.
 */
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "none" | "xs" | "sm" | "md" | "lg";
}

export function ResponsiveGrid({
  children,
  className = "",
  columns = { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 },
  gap = "md"
}: ResponsiveGridProps) {
  const { breakpoint } = useMobileDetection();
  
  // Déterminer le nombre de colonnes basé sur le breakpoint actuel
  const currentColumns = 
    breakpoint.xs ? columns.xs || 1 :
    breakpoint.sm ? columns.sm || 2 :
    breakpoint.md ? columns.md || 2 :
    breakpoint.lg ? columns.lg || 3 :
    columns.xl || 4;
  
  // Classes de grille
  const gridTemplateColumns = `repeat(${currentColumns}, minmax(0, 1fr))`;
  
  // Classes d'espacement
  const gapClasses = {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }[gap];
  
  return (
    <div 
      className={`grid ${gapClasses} ${className}`}
      style={{ 
        gridTemplateColumns,
        width: '100%'
      }}
    >
      {children}
    </div>
  );
}

/**
 * ResponsiveText
 * --------------
 * Composant de texte qui s'adapte automatiquement aux différentes tailles d'écran.
 */
interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  mobileSize?: "xs" | "sm" | "md" | "lg";
}

export function ResponsiveText({
  children,
  className = "",
  size = "md",
  weight = "normal",
  align = "left",
  mobileSize
}: ResponsiveTextProps) {
  const { breakpoint } = useMobileDetection();
  
  // Taille de texte pour mobile
  const actualSize = breakpoint.xs && mobileSize ? mobileSize : size;
  
  // Classes de taille
  const sizeClasses = {
    xs: "text-xs sm:text-sm",
    sm: "text-sm sm:text-base",
    md: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl",
    xl: "text-xl sm:text-2xl",
    "2xl": "text-2xl sm:text-3xl",
  }[actualSize];
  
  // Classes de poids
  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  }[weight];
  
  // Classes d'alignement
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];
  
  return (
    <div className={`${sizeClasses} ${weightClasses} ${alignClasses} ${className}`}>
      {children}
    </div>
  );
}