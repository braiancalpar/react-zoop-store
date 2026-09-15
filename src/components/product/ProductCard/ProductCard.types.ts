/**
 * ProductCard Component Types
 */

export interface Product {
  id: number;
  title: string;
  brand?: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  thumbnail: string;
  stock?: number;
}

export interface ProductCardProps {
  /**
   * Product data
   */
  product: Product;

  /**
   * Add to cart handler
   */
  onAddToCart?: (productId: number) => void;

  /**
   * Product click handler
   */
  onClick?: (productId: number) => void;

  /**
   * Show loading skeleton
   */
  loading?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
