/**
 * MainLayout Component Types
 */

import React from 'react';

export interface MainLayoutProps {
  /**
   * Page content
   */
  children: React.ReactNode;

  /**
   * Number of items in cart (for Header)
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
