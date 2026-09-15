/**
 * Container Component
 *
 * Wrapper component com max-width responsivo e padding consistente.
 *
 * @example
 * ```tsx
 * <Container>
 *   <h1>Conteúdo centralizado</h1>
 * </Container>
 *
 * <Container size="lg" noPadding>
 *   <FullWidthImage />
 * </Container>
 * ```
 */

import React from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps {
  size?: ContainerSize;
  noPadding?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  size = 'xl',
  noPadding = false,
  children,
  className = '',
}) => {
  // Size styles (max-width)
  const sizeStyles = {
    sm: 'max-w-screen-sm', // 640px
    md: 'max-w-screen-md', // 768px
    lg: 'max-w-screen-lg', // 1024px
    xl: 'max-w-screen-xl', // 1280px
    full: 'max-w-full',
  };

  // Padding styles
  const paddingStyles = noPadding ? '' : 'px-4 sm:px-6 lg:px-8';

  // Combine classes
  const combinedClasses = ['w-full mx-auto', sizeStyles[size], paddingStyles, className]
    .filter(Boolean)
    .join(' ');

  return <div className={combinedClasses}>{children}</div>;
};

// Memoize to prevent unnecessary re-renders
export default React.memo(Container);
