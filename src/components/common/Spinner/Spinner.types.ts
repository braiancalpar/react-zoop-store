/**
 * Spinner Component Types
 */

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerColor = 'primary' | 'secondary' | 'white' | 'current';

export interface SpinnerProps {
  /**
   * Spinner size
   */
  size?: SpinnerSize;

  /**
   * Spinner color
   */
  color?: SpinnerColor;

  /**
   * Additional CSS classes
   */
  className?: string;
}
