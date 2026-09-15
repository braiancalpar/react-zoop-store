/**
 * Header Component Types
 */

export interface HeaderProps {
  /**
   * Number of items in cart (for badge)
   */
  cartItemCount?: number;

  /**
   * Search handler
   */
  onSearch?: (query: string) => void;

  /**
   * Cart click handler
   */
  onCartClick?: () => void;
}
