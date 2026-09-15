/**
 * ProductGrid Component Types
 */

import type { Product } from '../ProductCard/ProductCard.types';

export type GridColumns = 1 | 2 | 3 | 4;

export interface ProductGridProps {
  /**
   * List of products
   */
  products: Product[];

  /**
   * Number of columns (responsive by default)
   */
  columns?: GridColumns;

  /**
   * Show loading skeletons
   */
  loading?: boolean;

  /**
   * Number of skeleton items to show
   */
  skeletonCount?: number;

  /**
   * Add to cart handler
   */
  onAddToCart?: (productId: number) => void;

  /**
   * Product click handler
   */
  onProductClick?: (productId: number) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}
