import { useEffect } from "react";

/**
 * Hook pour optimiser les interactions tactiles sur mobile
 * 
 * Résout les problèmes courants :
 * - Désactive les effets hover sur les appareils tactiles
 * - Améliore la réactivité des boutons sur mobile
 * - Évite le zoom sur les champs de formulaire
 * - Optimise les animations pour mobile
 */
export function useTouchOptimization() {
  useEffect(() => {
    // Détection d'appareil tactile
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 || 
                         (navigator as any).msMaxTouchPoints > 0;
    
    if (!isTouchDevice) {
      return; // Pas d'optimisations nécessaires pour les appareils non tactiles
    }

    // 1. Ajouter une classe CSS pour indiquer que c'est un appareil tactile
    document.documentElement.classList.add("touch-device");

    // 2. Éviter le zoom sur les champs de formulaire sur iOS
    const preventZoomOnFocus = () => {
      const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        'input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea'
      );
      
      inputs.forEach(input => {
        // Prévenir le zoom automatique sur iOS
        input.addEventListener("touchstart", () => {
          if (document.activeElement !== input) {
            // Ne pas déclencher si déjà en focus
            input.style.fontSize = "16px"; // Évite le zoom sur iOS
          }
        }, { passive: true });
        
        // Réinitialiser après le blur
        input.addEventListener("blur", () => {
          input.style.fontSize = "";
        });
      });
    };

    // 3. Améliorer la réactivité des boutons sur mobile
    const improveButtonResponsiveness = () => {
      const buttons = document.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>(
        'button, a.btn, a[role="button"]'
      );
      
      buttons.forEach(button => {
        // Ajouter un délai minimal pour éviter les doubles clics
        let lastTouchTime = 0;
        const handleTouch = (e: TouchEvent) => {
          const currentTime = Date.now();
          if (currentTime - lastTouchTime < 300) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          lastTouchTime = currentTime;
        };
        
        button.addEventListener("touchstart", handleTouch as EventListener, { passive: false });
        
        // Ajouter un feedback tactile visuel
        button.addEventListener("touchstart", () => {
          button.classList.add("touch-active");
        }, { passive: true });
        
        button.addEventListener("touchend", () => {
          setTimeout(() => {
            button.classList.remove("touch-active");
          }, 150);
        }, { passive: true });
        
        button.addEventListener("touchcancel", () => {
          button.classList.remove("touch-active");
        }, { passive: true });
      });
    };

    // 4. Désactiver les animations lourdes sur mobile
    const optimizeAnimations = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      if (prefersReducedMotion || window.innerWidth < 768) {
        // Ajouter une classe pour réduire les animations
        document.documentElement.classList.add("reduce-motion");
        
        // Désactiver certaines animations complexes
        const heavyAnimations = document.querySelectorAll<HTMLElement>(
          '[class*="animate-"], [style*="animation"]'
        );
        
        heavyAnimations.forEach(el => {
          const originalAnimation = el.style.animation;
          el.dataset.originalAnimation = originalAnimation;
          el.style.animation = "none";
        });
      }
    };

    // 5. Prévenir le scroll de la page lorsque l'utilisateur interagit avec certains éléments
    const preventPullToRefresh = () => {
      let startY = 0;
      
      const handleTouchStart = (e: TouchEvent) => {
        startY = e.touches[0].clientY;
      };
      
      const handleTouchMove = (e: TouchEvent) => {
        const touchY = e.touches[0].clientY;
        const touchDelta = touchY - startY;
        
        // Empêcher le pull-to-refresh lorsque l'utilisateur fait défiler vers le bas depuis le haut
        if (window.scrollY === 0 && touchDelta > 0) {
          e.preventDefault();
        }
      };
      
      // Appliquer uniquement sur les éléments non-scrollables
      const nonScrollableElements = document.querySelectorAll<HTMLElement>(
        'nav, header, footer, .modal, .overlay, [data-prevent-pull-to-refresh]'
      );
      
      nonScrollableElements.forEach(el => {
        el.addEventListener("touchstart", handleTouchStart, { passive: true });
        el.addEventListener("touchmove", handleTouchMove, { passive: false });
      });
    };

    // Initialiser les optimisations
    setTimeout(() => {
      preventZoomOnFocus();
      improveButtonResponsiveness();
      optimizeAnimations();
      preventPullToRefresh();
    }, 100);

    // Cleanup
    return () => {
      document.documentElement.classList.remove("touch-device", "reduce-motion");
      
      // Restaurer les animations désactivées
      const elements = document.querySelectorAll<HTMLElement>('[data-original-animation]');
      elements.forEach(el => {
        if (el.dataset.originalAnimation) {
          el.style.animation = el.dataset.originalAnimation;
        }
      });
    };
  }, []);
}