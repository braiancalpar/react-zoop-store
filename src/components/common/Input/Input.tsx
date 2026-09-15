/**
 * Input Component
 *
 * Componente de input com suporte a ícones, estados de erro e diferentes tamanhos.
 *
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   placeholder="Digite seu email"
 *   leftIcon={<MailIcon />}
 * />
 *
 * <Input
 *   type="search"
 *   placeholder="Buscar produtos..."
 *   error="Campo obrigatório"
 * />
 * ```
 */

import React from 'react';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: InputType;
  size?: InputSize;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      size = 'md',
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      wrapperClassName = '',
      className = '',
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed bg-white';

    // Size styles
    const sizeStyles = {
      sm: 'text-sm py-1.5 min-h-[32px]',
      md: 'text-base py-2 min-h-[40px]',
      lg: 'text-lg py-3 min-h-[48px]',
    };

    // Padding based on icons
    const paddingStyles =
      leftIcon && rightIcon
        ? 'pl-10 pr-10'
        : leftIcon
          ? 'pl-10 pr-4'
          : rightIcon
            ? 'pl-4 pr-10'
            : 'px-4';

    // Error or normal state
    const stateStyles = error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-cinza-300 focus:ring-magenta-500 focus:border-magenta-500';

    // Combine classes
    const combinedClasses = [
      baseStyles,
      sizeStyles[size],
      paddingStyles,
      stateStyles,
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = ['relative', fullWidth ? 'w-full' : 'inline-block', wrapperClassName]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-grafite-400">
            {leftIcon}
          </div>
        )}

        {/* Input */}
        <input ref={ref} type={type} className={combinedClasses} disabled={disabled} {...props} />

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-grafite-400">
            {rightIcon}
          </div>
        )}

        {/* Error Message */}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Memoize to prevent unnecessary re-renders
export default React.memo(Input);
