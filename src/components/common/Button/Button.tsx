/**
 * Button Component
 *
 * Componente de botão versátil com múltiplos variants, tamanhos e estados.
 * Otimizado com React.memo para performance.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Adicionar ao Carrinho
 * </Button>
 *
 * <Button variant="outline" loading>
 *   Carregando...
 * </Button>
 *
 * <Button variant="ghost" leftIcon={<SearchIcon />}>
 *   Buscar
 * </Button>
 * ```
 */

import React from 'react';
import type { ButtonProps } from './Button.types';

const LoadingSpinner: React.FC = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;

  // Base styles
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-magenta-500 to-magenta-600 text-white hover:from-magenta-600 hover:to-magenta-700 focus:ring-magenta-500 shadow-md hover:shadow-lg hover:shadow-magenta-glow',
    secondary:
      'bg-azul-500 text-white hover:bg-azul-600 focus:ring-azul-500 shadow-md hover:shadow-lg',
    outline:
      'border-2 border-magenta-500 text-magenta-600 hover:bg-magenta-50 focus:ring-magenta-500',
    ghost: 'text-grafite-700 hover:bg-cinza-100 focus:ring-cinza-300',
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5 min-h-[32px]',
    md: 'text-base px-4 py-2 min-h-[40px]',
    lg: 'text-lg px-6 py-3 min-h-[48px]',
  };

  // Combine classes
  const combinedClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={combinedClasses} disabled={isDisabled} {...props}>
      {loading ? <LoadingSpinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(Button);
