/**
 * CartItem Component
 *
 * Exibe um item individual no carrinho com opções de edição.
 */

import React, { useMemo } from 'react';
import QuantitySelector from '../../common/QuantitySelector';
import Typography from '../../common/Typography';
import OptimizedImage from '../../common/OptimizedImage';

export interface CartItemData {
  id: number;
  title: string;
  brand?: string;
  price: number;
  discountPercentage?: number;
  thumbnail: string;
  quantity: number;
}

export interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  // Calcula preços
  const priceCalculation = useMemo(() => {
    const hasDiscount = item.discountPercentage && item.discountPercentage > 0;
    const discountedPrice = hasDiscount
      ? item.price * (1 - (item.discountPercentage ?? 0) / 100)
      : item.price;

    return {
      originalPrice: item.price,
      finalPrice: discountedPrice,
      totalPrice: discountedPrice * item.quantity,
      hasDiscount,
    };
  }, [item.price, item.discountPercentage, item.quantity]);

  // Formata preço em BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-cinza-200 hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="shrink-0">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-cinza-50">
          <OptimizedImage
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
            aspectRatio="square"
            priority={true}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2 mb-2">
          {/* Title and Brand */}
          <div className="flex-1 min-w-0">
            {item.brand && (
              <Typography
                variant="caption"
                color="text-grafite-500"
                className="uppercase font-semibold mb-1"
              >
                {item.brand}
              </Typography>
            )}
            <Typography variant="body" weight="semibold" className="line-clamp-2">
              {item.title}
            </Typography>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id)}
            className="shrink-0 p-1.5 text-grafite-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Remover item"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-end justify-between gap-4 mt-4">
          {/* Quantity Selector */}
          <div>
            <Typography variant="caption" className="mb-1.5 block" color="text-grafite-600">
              Quantidade
            </Typography>
            <QuantitySelector
              value={item.quantity}
              onChange={(newQuantity) => onQuantityChange(item.id, newQuantity)}
              min={1}
              max={99}
              size="sm"
            />
          </div>

          {/* Prices */}
          <div className="text-right">
            {priceCalculation.hasDiscount && (
              <Typography variant="caption" className="line-through" color="text-grafite-400">
                {formatPrice(priceCalculation.originalPrice * item.quantity)}
              </Typography>
            )}
            <Typography variant="title" weight="bold" color="text-magenta-600">
              {formatPrice(priceCalculation.totalPrice)}
            </Typography>
            {item.quantity > 1 && (
              <Typography variant="caption" color="text-grafite-500">
                {formatPrice(priceCalculation.finalPrice)} cada
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
