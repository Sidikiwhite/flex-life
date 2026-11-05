import React, { useState, useEffect } from 'react';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { getResponsiveImage, IMAGE_CONFIG, getOptimalImageConfig } from '../utils/responsiveConfig';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  
  // Options d'image
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  
  // Options responsive
  imageType?: keyof typeof IMAGE_CONFIG;
  sizes?: string;
  
  // Options de style
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  
  // Callbacks
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * ResponsiveImage
 * ---------------
 * Composant d'image qui s'adapte automatiquement aux différentes tailles d'écran.
 * Optimise le chargement des images pour les appareils mobiles.
 */
export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  loading = 'lazy',
  imageType,
  sizes,
  className = '',
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError
}: ResponsiveImageProps) {
  const { breakpoint, isMobile, viewportWidth } = useMobileDetection();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  
  // Déterminer la taille optimale de l'image
  useEffect(() => {
    if (!imageType) {
      // Si pas de type d'image spécifique, utiliser l'URL d'origine
      setCurrentSrc(src);
      return;
    }
    
    try {
      // Déterminer le breakpoint actuel
      const currentBreakpoint = 
        breakpoint.xs ? 'xs' :
        breakpoint.sm ? 'sm' :
        breakpoint.md ? 'md' :
        breakpoint.lg ? 'lg' :
        'xl';
      
      // Obtenir la configuration optimale pour ce breakpoint
      const optimalConfig = getOptimalImageConfig(imageType, currentBreakpoint);
      
      // Générer l'URL d'image responsive
      const responsiveSrc = getResponsiveImage(src, {
        width: optimalConfig.width,
        height: optimalConfig.height,
        quality: isMobile ? 75 : 85, // Qualité réduite sur mobile pour la performance
        format: 'webp', // Préférer WebP quand c'est supporté
      });
      
      setCurrentSrc(responsiveSrc);
    } catch (error) {
      console.warn('Erreur lors de la génération de l\'image responsive:', error);
      setCurrentSrc(src); // Retour à l'URL d'origine en cas d'erreur
    }
  }, [src, imageType, breakpoint, isMobile]);
  
  // Générer l'attribut sizes si non fourni
  const generatedSizes = sizes || (() => {
    if (fill) {
      return '100vw';
    }
    
    if (width) {
      if (width <= 480) return '(max-width: 479px) 100vw, 480px';
      if (width <= 768) return '(max-width: 767px) 100vw, 768px';
      if (width <= 1024) return '(max-width: 1023px) 100vw, 1024px';
      return '100vw';
    }
    
    // Tailles par défaut basées sur le type d'image
    if (imageType === 'hero') {
      return '(max-width: 479px) 100vw, (max-width: 767px) 100vw, (max-width: 1023px) 100vw, 1200px';
    }
    
    if (imageType === 'card') {
      return '(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 400px';
    }
    
    return '100vw';
  })();
  
  // Styles pour l'image
  const imageStyle: React.CSSProperties = {
    objectFit,
    objectPosition,
    width: fill ? '100%' : width,
    height: fill ? '100%' : height,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };
  
  // Styles pour le placeholder
  const placeholderStyle: React.CSSProperties = {
    width: fill ? '100%' : width,
    height: fill ? '100%' : height,
    backgroundColor: 'var(--bg-elevated)',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease',
  };
  
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };
  
  const handleError = () => {
    console.error(`Erreur de chargement de l'image: ${src}`);
    onError?.();
  };
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        position: fill ? 'relative' : 'static',
      }}
    >
      {/* Placeholder pendant le chargement */}
      {!isLoaded && (
        <div 
          className="placeholder"
          style={placeholderStyle}
          aria-hidden="true"
        />
      )}
      
      {/* Image réelle */}
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : loading}
        decoding="async"
        sizes={generatedSizes}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        className="w-full h-full"
        // Attributs de performance
        {...(priority ? {} : { 
          loading: 'lazy',
          fetchPriority: 'low'
        })}
      />
      
      {/* Indicateur de chargement pour les images prioritaires */}
      {priority && !isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-elevated/80 to-bg/80"
          aria-label="Chargement de l'image..."
          role="status"
        >
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

/**
 * Image de fond responsive
 */
interface ResponsiveBackgroundImageProps {
  src: string;
  alt?: string;
  className?: string;
  imageType?: keyof typeof IMAGE_CONFIG;
  children?: React.ReactNode;
}

export function ResponsiveBackgroundImage({
  src,
  alt = '',
  className = '',
  imageType,
  children
}: ResponsiveBackgroundImageProps) {
  const { breakpoint } = useMobileDetection();
  const [backgroundSrc, setBackgroundSrc] = useState(src);
  
  useEffect(() => {
    if (!imageType) {
      setBackgroundSrc(src);
      return;
    }
    
    try {
      const currentBreakpoint = 
        breakpoint.xs ? 'xs' :
        breakpoint.sm ? 'sm' :
        breakpoint.md ? 'md' :
        breakpoint.lg ? 'lg' :
        'xl';
      
      const optimalConfig = getOptimalImageConfig(imageType, currentBreakpoint);
      const responsiveSrc = getResponsiveImage(src, {
        width: optimalConfig.width,
        height: optimalConfig.height,
        quality: 85,
        format: 'webp',
      });
      
      setBackgroundSrc(responsiveSrc);
    } catch (error) {
      console.warn('Erreur lors de la génération de l\'image de fond responsive:', error);
      setBackgroundSrc(src);
    }
  }, [src, imageType, breakpoint]);
  
  return (
    <div 
      className={`relative ${className}`}
      style={{
        backgroundImage: `url(${backgroundSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
    >
      {children}
    </div>
  );
}