import React, { useEffect, useState, useCallback } from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import type { OptimizedImageProps, ImageLoadState } from './OptimizedImage.types';

const ASPECT_RATIO_MAP = {
  square: 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  auto: 'aspect-auto',
};

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  priority = false,
  fallbackSrc = '/placeholder-image.svg',
  onLoad,
  onError,
  threshold = 0.01,
  rootMargin = '50px',
}) => {
  const [loadState, setLoadState] = useState<ImageLoadState>({
    isLoading: false,
    isLoaded: false,
    hasError: false,
  });

  const [currentSrc, setCurrentSrc] = useState<string>(priority ? src : '');

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  useEffect(() => {
    if (priority) {
      // Imagens prioritárias carregam imediatamente
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentSrc(src);
      setLoadState((prev) => ({ ...prev, isLoading: true }));
    } else if (isIntersecting && !currentSrc) {
      // Lazy loading: carrega quando entra no viewport
      setCurrentSrc(src);
      setLoadState((prev) => ({ ...prev, isLoading: true }));
    }
  }, [isIntersecting, src, priority, currentSrc]);

  // Handler de sucesso no carregamento
  const handleLoad = useCallback(() => {
    setLoadState({
      isLoading: false,
      isLoaded: true,
      hasError: false,
    });
    onLoad?.();
  }, [onLoad]);

  // Handler de erro no carregamento
  const handleError = useCallback(() => {
    setLoadState({
      isLoading: false,
      isLoaded: false,
      hasError: true,
    });

    // Tenta usar imagem fallback
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }

    onError?.();
  }, [currentSrc, fallbackSrc, onError]);

  const aspectRatioClass = ASPECT_RATIO_MAP[aspectRatio];
  const containerClasses = `relative overflow-hidden ${aspectRatioClass} ${className}`.trim();

  const imageClasses = `
    w-full h-full object-cover
    transition-opacity duration-500 ease-in-out
    ${loadState.isLoaded ? 'opacity-100' : 'opacity-0'}
  `.trim();

  const placeholderClasses = `
    absolute inset-0 w-full h-full object-cover
    bg-gradient-to-br from-cinza-100 to-cinza-200
    transition-opacity duration-500 ease-in-out
    ${loadState.isLoaded ? 'opacity-0' : 'opacity-100'}
  `.trim();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={containerClasses}>
      {/* Placeholder com blur (mostrado enquanto carrega) */}
      {!loadState.isLoaded && (
        <div className={placeholderClasses}>
          <div className="w-full h-full flex items-center justify-center">
            {loadState.isLoading && (
              <div className="animate-pulse">
                <svg
                  className="w-12 h-12 text-cinza-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Imagem real */}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
        />
      )}

      {/* Indicador de erro */}
      {loadState.hasError && currentSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-cinza-100">
          <div className="text-center text-grafite-400">
            <svg
              className="w-16 h-16 mx-auto mb-2 text-cinza-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm">Imagem não disponível</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Memoize para evitar re-renders desnecessários
export default React.memo(OptimizedImage);
