/**
 * Spinner Component
 *
 * Componente de loading indicator com diferentes tamanhos e cores.
 *
 * @example
 * ```tsx
 * <Spinner size="md" color="primary" />
 * <Spinner size="lg" color="white" />
 * ```
 */

import React from 'react';
import type { SpinnerProps } from './Spinner.types';

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'primary', className = '' }) => {
  // Size styles
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  // Color styles
  const colorStyles = {
    primary: 'text-magenta-500',
    secondary: 'text-azul-500',
    white: 'text-white',
    current: 'text-current',
  };

  // Combine classes
  const combinedClasses = ['animate-spin', sizeStyles[size], colorStyles[color], className]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      className={combinedClasses}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Carregando"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(Spinner);
