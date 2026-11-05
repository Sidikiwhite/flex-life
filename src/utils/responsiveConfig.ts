/**
 * Configuration des breakpoints responsive
 * 
 * Utilise les mêmes valeurs que les médias queries CSS pour la cohérence
 */

export const BREAKPOINTS = {
  xs: 359,    // Très petit mobile
  sm: 479,    // Petit mobile
  md: 767,    // Mobile/tablette
  lg: 1023,   // Tablette/desktop
  xl: 1280,   // Desktop large
  xxl: 1536,  // Desktop très large
} as const;

/**
 * Hook pour vérifier les breakpoints (version simplifiée)
 */
export const useResponsive = () => {
  if (typeof window === 'undefined') {
    return {
      isXs: false,
      isSm: false,
      isMd: false,
      isLg: false,
      isXl: false,
      isXxl: false,
      currentBreakpoint: 'lg' as const,
    };
  }

  const width = window.innerWidth;
  
  return {
    isXs: width <= BREAKPOINTS.xs,
    isSm: width <= BREAKPOINTS.sm,
    isMd: width <= BREAKPOINTS.md,
    isLg: width <= BREAKPOINTS.lg,
    isXl: width <= BREAKPOINTS.xl,
    isXxl: width <= BREAKPOINTS.xxl,
    currentBreakpoint: (
      width <= BREAKPOINTS.xs ? 'xs' :
      width <= BREAKPOINTS.sm ? 'sm' :
      width <= BREAKPOINTS.md ? 'md' :
      width <= BREAKPOINTS.lg ? 'lg' :
      width <= BREAKPOINTS.xl ? 'xl' :
      'xxl'
    ) as const,
    width,
  };
};

/**
 * Fonction pour générer des URLs d'images responsive
 * (S'assurer que le serveur supporte les transformations d'images)
 */
export const getResponsiveImage = (
  baseUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
    devicePixelRatio?: number;
  } = {}
): string => {
  // Si c'est un SVG ou une image vectorielle, retourner telle quelle
  if (baseUrl.endsWith('.svg') || baseUrl.endsWith('.svg?') || baseUrl.includes('.svg?')) {
    return baseUrl;
  }

  const { width, height, quality = 85, format = 'webp', devicePixelRatio = 1 } = options;
  
  // Pour l'instant, retourner l'URL originale
  // Dans un environnement de production, vous pourriez utiliser un service comme:
  // - ImageKit
  // - Cloudinary
  // - Imgix
  // - Vercel Image Optimization
  
  return baseUrl;
};

/**
 * Configuration pour les images responsive par breakpoint
 */
export const IMAGE_CONFIG = {
  hero: {
    xs: { width: 375, height: 250 },
    sm: { width: 480, height: 320 },
    md: { width: 768, height: 512 },
    lg: { width: 1024, height: 683 },
    xl: { width: 1280, height: 853 },
    xxl: { width: 1536, height: 1024 },
  },
  card: {
    xs: { width: 280, height: 187 },
    sm: { width: 320, height: 213 },
    md: { width: 400, height: 267 },
    lg: { width: 500, height: 333 },
    xl: { width: 600, height: 400 },
  },
  thumbnail: {
    xs: { width: 80, height: 80 },
    sm: { width: 100, height: 100 },
    md: { width: 120, height: 120 },
    lg: { width: 150, height: 150 },
  },
} as const;

/**
 * Fonction pour obtenir la configuration d'image optimale en fonction du breakpoint
 */
export const getOptimalImageConfig = (
  imageType: keyof typeof IMAGE_CONFIG,
  breakpoint: keyof typeof BREAKPOINTS
) => {
  const config = IMAGE_CONFIG[imageType];
  return config[breakpoint] || config.lg;
};

/**
 * Classes Tailwind responsive préconfigurées
 */
export const RESPONSIVE_CLASSES = {
  // Grid columns
  grid: {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  },
  
  // Flex direction
  flex: {
    col: 'flex-col',
    row: 'flex-row',
    'col-reverse': 'flex-col-reverse',
    'row-reverse': 'flex-row-reverse',
    'col-mobile-row-desktop': 'flex-col md:flex-row',
    'row-mobile-col-desktop': 'flex-row md:flex-col',
  },
  
  // Text sizes
  text: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    'responsive-heading': 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    'responsive-subheading': 'text-xl sm:text-2xl md:text-3xl',
    'responsive-body': 'text-sm sm:text-base md:text-lg',
  },
  
  // Spacing
  spacing: {
    none: 'p-0',
    xs: 'p-2 sm:p-3',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-12',
  },
  
  // Gap
  gap: {
    none: 'gap-0',
    xs: 'gap-2 sm:gap-3',
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12',
  },
} as const;

/**
 * Helper pour combiner des classes responsive
 */
export const responsive = (
  baseClass: string,
  mobileClass?: string,
  tabletClass?: string,
  desktopClass?: string
): string => {
  const classes = [baseClass];
  
  if (mobileClass) {
    classes.push(mobileClass);
  }
  
  if (tabletClass) {
    classes.push(`sm:${tabletClass}`);
  }
  
  if (desktopClass) {
    classes.push(`lg:${desktopClass}`);
  }
  
  return classes.join(' ');
};