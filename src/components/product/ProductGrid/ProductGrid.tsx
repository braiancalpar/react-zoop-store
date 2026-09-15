/**
 * ProductGrid Component
 *
 * Grid responsivo para exibir produtos.
 * Suporta loading skeletons e empty state.
 *
 * @example
 * ```tsx
 * <ProductGrid
 *   products={products}
 *   onAddToCart={(id) => addToCart(id)}
 *   onProductClick={(id) => navigate(`/product/${id}`)}
 * />
 *
 * <ProductGrid loading skeletonCount={8} />
 * ```
 */

import React from 'react';
import ProductCard from '../ProductCard';
import Typography from '../../common/Typography';
import type { Product } from '../../../types/Product';

export type GridColumns = 1 | 2 | 3 | 4;

export interface ProductGridProps {
  /**
   * List of products
   */
  products?: Product[];

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

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns,
  loading = false,
  skeletonCount = 8,
  onAddToCart,
  onProductClick,
  className = '',
}) => {
  // Responsive grid classes (default)
  const defaultGridClasses = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

  // Custom columns grid classes
  const customGridClasses = columns
    ? `grid gap-6 ${
        columns === 1
          ? 'grid-cols-1'
          : columns === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : columns === 3
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }`
    : defaultGridClasses;

  // Loading state - show skeletons
  if (loading) {
    return (
      <div className={`${customGridClasses} ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCard
            key={`skeleton-${index}`}
            product={{
              id: index,
              title: '',
              price: 0,
              rating: 0,
              thumbnail: '',
            }}
            loading
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <svg
          className="h-24 w-24 text-cinza-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <Typography variant="title" weight="semibold" color="text-grafite-600" className="mb-2">
          Nenhum produto encontrado
        </Typography>
        <Typography variant="body" color="text-grafite-500" align="center">
          Tente ajustar os filtros ou buscar por outro termo
        </Typography>
      </div>
    );
  }

  // Products grid
  return (
    <div className={`${customGridClasses} ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(ProductGrid);
