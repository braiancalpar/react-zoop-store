/**
 * Button Component Types
 */

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button style variant
   */
  variant?: ButtonVariant;

  /**
   * Button size
   */
  size?: ButtonSize;

  /**
   * Full width button
   */
  fullWidth?: boolean;

  /**
   * Loading state (shows spinner)
   */
  loading?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Icon to show on the left
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to show on the right
   */
  rightIcon?: React.ReactNode;

  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
