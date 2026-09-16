export type AspectRatio = 'square' | '16/9' | '4/3' | '3/2' | 'auto';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: AspectRatio;
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number;
  rootMargin?: string;
}

export interface ImageLoadState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
}
