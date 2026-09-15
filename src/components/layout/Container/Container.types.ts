/**
 * Container Component Types
 */

import React from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps {
  /**
   * Maximum width size
   */
  size?: ContainerSize;

  /**
   * Disable padding
   */
  noPadding?: boolean;

  /**
   * Content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
