/**
 * ProductCard Component
 *
 * Card de produto OTIMIZADO com React.memo e useMemo.
 * Componente CRÍTICO - usado 700+ vezes.
 *
 * @example
 * ```tsx
 * <ProductCard
 *   product={product}
 *   onAddToCart={(id) => addToCart(id)}
 *   onClick={(id) => navigate(`/product/${id}`)}
 * />
 * ```
 */

import React, { useCallback } from 'react';
import ProductPrice from '../ProductPrice';
import Rating from '../../common/Rating';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import type { ProductCardProps } from './ProductCard.types';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onClick,
  loading = false,
  className = '',
}) => {
  // Handle add to cart with useCallback to prevent re-renders
  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onAddToCart) {
        onAddToCart(product.id);
      }
    },
    [onAddToCart, product.id]
  );

  // Handle card click
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(product.id);
    }
  }, [onClick, product.id]);

  // Loading skeleton
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
        <div className="aspect-square bg-cinza-200 shimmer" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-cinza-200 shimmer rounded w-3/4" />
          <div className="h-4 bg-cinza-200 shimmer rounded w-1/2" />
          <div className="h-8 bg-cinza-200 shimmer rounded" />
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock !== undefined && product.stock === 0;

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-lg shadow-md overflow-hidden hover-lift cursor-pointer transition-all duration-300 group ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-cinza-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discountPercentage && product.discountPercentage > 0 && (
          <div className="absolute top-2 left-2">
            <Badge variant="success">-{Math.round(product.discountPercentage)}%</Badge>
          </div>
        )}

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute top-2 right-2">
            <Badge variant="error">Esgotado</Badge>
          </div>
        )}

        {/* Add to Cart Button Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Indisponível' : 'Adicionar'}
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-2">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-grafite-500 uppercase tracking-wide">{product.brand}</p>
        )}

        {/* Title */}
        <h3 className="text-base font-medium text-grafite-900 line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>

        {/* Rating */}
        <Rating rating={product.rating} size="sm" showNumber />

        {/* Price */}
        <ProductPrice
          price={product.price}
          discountPercentage={product.discountPercentage}
          size="md"
        />
      </div>
    </div>
  );
};

// CRITICAL: Memoize with custom comparison to prevent unnecessary re-renders
export default React.memo(ProductCard, (prevProps, nextProps) => {
  // Only re-render if product data actually changed
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.discountPercentage === nextProps.product.discountPercentage &&
    prevProps.product.stock === nextProps.product.stock &&
    prevProps.loading === nextProps.loading
  );
});
