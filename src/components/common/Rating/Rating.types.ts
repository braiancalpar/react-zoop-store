/**
 * Rating Component Types
 */

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  /**
   * Rating value (0-5)
   */
  rating: number;

  /**
   * Total number of reviews (optional)
   */
  totalReviews?: number;

  /**
   * Rating size
   */
  size?: RatingSize;

  /**
   * Show rating number next to stars
   */
  showNumber?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
