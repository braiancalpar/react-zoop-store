/**
 * Input Component Types
 */

import React from 'react';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input type
   */
  type?: InputType;

  /**
   * Input size
   */
  size?: InputSize;

  /**
   * Error message
   */
  error?: string;

  /**
   * Icon to show on the left
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to show on the right
   */
  rightIcon?: React.ReactNode;

  /**
   * Full width input
   */
  fullWidth?: boolean;

  /**
   * Additional CSS classes for wrapper
   */
  wrapperClassName?: string;
}
