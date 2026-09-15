/**
 * Badge Component Types
 */

import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  /**
   * Badge variant
   */
  variant?: BadgeVariant;

  /**
   * Badge size
   */
  size?: BadgeSize;

  /**
   * Badge content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
