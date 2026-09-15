/**
 * ProductPrice Component
 *
 * Exibe o preço do produto com desconto e badge opcional.
 *
 * @example
 * ```tsx
 * <ProductPrice price={2800} discountPercentage={15} showBadge />
 * <ProductPrice price={1500} size="lg" />
 * ```
 */

import React, { useMemo } from 'react';
import Badge from '../../common/Badge';

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

const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  discountPercentage = 0,
  size = 'md',
  showBadge = true,
  className = '',
}) => {
  // Calculate discounted price
  const discountedPrice = useMemo(() => {
    if (discountPercentage > 0) {
      return price - (price * discountPercentage) / 100;
    }
    return price;
  }, [price, discountPercentage]);

  // Format price to BRL
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Size styles
  const sizeStyles = {
    sm: {
      discounted: 'text-lg',
      original: 'text-sm',
    },
    md: {
      discounted: 'text-xl',
      original: 'text-base',
    },
    lg: {
      discounted: 'text-2xl',
      original: 'text-lg',
    },
  };

  const hasDiscount = discountPercentage > 0;

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {/* Discounted Price */}
      <span className={`${sizeStyles[size].discounted} font-bold text-magenta-600`}>
        {formatPrice(discountedPrice)}
      </span>

      {/* Original Price (if has discount) */}
      {hasDiscount && (
        <span className={`${sizeStyles[size].original} text-grafite-500 line-through`}>
          {formatPrice(price)}
        </span>
      )}

      {/* Discount Badge */}
      {hasDiscount && showBadge && (
        <Badge variant="success" size="sm">
          -{Math.round(discountPercentage)}%
        </Badge>
      )}
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(ProductPrice);
