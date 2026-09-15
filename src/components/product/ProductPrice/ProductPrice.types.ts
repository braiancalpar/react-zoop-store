/**
 * ProductPrice Component Types
 */

export type ProductPriceSize = 'sm' | 'md' | 'lg';

export interface ProductPriceProps {
  /**
   * Price value
   */
  price: number;

  /**
   * Discount percentage (0-100)
   */
  discountPercentage?: number;

  /**
   * Price size
   */
  size?: ProductPriceSize;

  /**
   * Show discount badge
   */
  showBadge?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
