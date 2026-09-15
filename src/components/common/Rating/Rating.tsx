/**
 * Rating Component
 *
 * Componente de avaliação por estrelas (read-only por enquanto).
 *
 * @example
 * ```tsx
 * <Rating rating={4.5} totalReviews={128} />
 * <Rating rating={3} size="sm" />
 * <Rating rating={5} showNumber />
 * ```
 */

import React from 'react';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  /**
   * Valor da avaliação (0-5)
   */
  rating: number;

  /**
   * Total de avaliações (opcional)
   */
  totalReviews?: number;

  /**
   * Variante de tamanho
   */
  size?: RatingSize;

  /**
   * Exibir valor numérico da avaliação
   */
  showNumber?: boolean;

  /**
   * Classes CSS adicionais
   */
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  totalReviews,
  size = 'md',
  showNumber = false,
  className = '',
}) => {
  // Clamp rating between 0 and 5
  const clampedRating = Math.min(Math.max(rating, 0), 5);

  // Size styles
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Star icon
  const StarIcon: React.FC<{ fill: 'full' | 'half' | 'empty' }> = ({ fill }) => {
    const fillColor = fill === 'empty' ? 'text-cinza-300' : 'text-yellow-400';

    if (fill === 'half') {
      return (
        <div className="relative">
          <svg
            className={`${sizeStyles[size]} text-cinza-300`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className={`${sizeStyles[size]} text-yellow-400 absolute top-0 left-0 overflow-hidden`}
            style={{ clipPath: 'inset(0 50% 0 0)' }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      );
    }

    return (
      <svg
        className={`${sizeStyles[size]} ${fillColor}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  };

  // Generate stars array
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    if (clampedRating >= starValue) {
      return 'full';
    } else if (clampedRating >= starValue - 0.5) {
      return 'half';
    } else {
      return 'empty';
    }
  }) as ('full' | 'half' | 'empty')[];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {stars.map((fill, index) => (
          <StarIcon key={index} fill={fill} />
        ))}
      </div>

      {/* Rating number */}
      {showNumber && (
        <span className={`${textSizeStyles[size]} font-medium text-grafite-700`}>
          {clampedRating.toFixed(1)}
        </span>
      )}

      {/* Total reviews */}
      {totalReviews !== undefined && (
        <span className={`${textSizeStyles[size]} text-grafite-500`}>({totalReviews})</span>
      )}
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(Rating);
