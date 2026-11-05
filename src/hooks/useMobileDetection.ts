import { useState, useEffect } from "react";

/**
 * Hook pour détecter les appareils mobiles et gérer les interactions tactiles
 * 
 * Fournit :
 * - isMobile: Détection basique de l'appareil mobile
 * - isTouch: Détection des écrans tactiles
 * - viewportWidth: Largeur actuelle de la fenêtre
 * - viewportHeight: Hauteur actuelle de la fenêtre
 * - orientation: Orientation de l'appareil (portrait/paysage)
 */
export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    window.innerHeight > window.innerWidth ? "portrait" : "landscape"
  );

  useEffect(() => {
    // Détection initiale
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      // Détection basique de mobile
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isUserAgentMobile = mobileRegex.test(userAgent);
      
      // Détection par taille d'écran
      const isScreenMobile = window.innerWidth <= 768;
      
      // Détection d'écran tactile
      const isTouchDevice = 'ontouchstart' in window || 
                            navigator.maxTouchPoints > 0 || 
                            (navigator as any).msMaxTouchPoints > 0;
      
      setIsMobile(isUserAgentMobile || isScreenMobile);
      setIsTouch(isTouchDevice);
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape");
    };

    checkMobile();

    // Gestionnaires d'événements
    const handleResize = () => {
      checkMobile();
    };

    const handleOrientationChange = () => {
      setTimeout(() => {
        setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape");
        setViewportWidth(window.innerWidth);
        setViewportHeight(window.innerHeight);
      }, 100);
    };

    // Écouteurs d'événements
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  // Détection de taille d'écran (utile pour les breakpoints)
  const isSmallScreen = viewportWidth <= 479;
  const isMediumScreen = viewportWidth <= 767;
  const isLargeScreen = viewportWidth <= 1023;
  const isExtraLargeScreen = viewportWidth > 1023;

  return {
    isMobile,
    isTouch,
    viewportWidth,
    viewportHeight,
    orientation,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
    // Utilitaires pour les breakpoints
    breakpoint: {
      xs: viewportWidth <= 359,
      sm: viewportWidth <= 479,
      md: viewportWidth <= 767,
      lg: viewportWidth <= 1023,
      xl: viewportWidth > 1023,
    }
  };
}