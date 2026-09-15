/**
 * Badge Component
 *
 * Componente de badge/tag para status, labels e indicadores.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Em estoque</Badge>
 * <Badge variant="error">Esgotado</Badge>
 * <Badge variant="info" size="sm">Novo</Badge>
 * ```
 */

import React from 'react';
import type { BadgeProps } from './Badge.types';

const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  className = '',
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';

  // Variant styles
  const variantStyles = {
    success: 'bg-verde-100 text-verde-700 border border-verde-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    error: 'bg-red-100 text-red-700 border border-red-200',
    info: 'bg-azul-100 text-azul-700 border border-azul-200',
    neutral: 'bg-cinza-100 text-grafite-700 border border-cinza-200',
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  // Combine classes
  const combinedClasses = [baseStyles, variantStyles[variant], sizeStyles[size], className]
    .filter(Boolean)
    .join(' ');

  return <span className={combinedClasses}>{children}</span>;
};

// Memoize to prevent unnecessary re-renders
export default React.memo(Badge);
