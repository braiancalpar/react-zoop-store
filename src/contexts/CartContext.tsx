/**
 * CartContext
 *
 * Context API para gerenciar o estado global do carrinho de compras.
 * Persiste os dados no localStorage e fornece a��es para manipular o carrinho.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Product } from '../types/Product';

export interface CartItemData {
  id: number;
  title: string;
  brand?: string;
  price: number;
  discountPercentage?: number;
  thumbnail: string;
  quantity: number;
}

interface CartContextData {
  items: CartItemData[];
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

const CART_STORAGE_KEY = 'zoop-store-cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItemData[]>(() => {
    // Inicializar do localStorage
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Sincronizar com localStorage sempre que os items mudarem
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Calcular totais
  const { itemCount, subtotal, discount, total } = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    const sub = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const disc = items.reduce((sum, item) => {
      if (item.discountPercentage && item.discountPercentage > 0) {
        const discountAmount = ((item.price * item.discountPercentage) / 100) * item.quantity;
        return sum + discountAmount;
      }
      return sum;
    }, 0);

    const tot = sub - disc;

    return {
      itemCount: count,
      subtotal: sub,
      discount: disc,
      total: tot,
    };
  }, [items]);

  // Adicionar produto ao carrinho
  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((currentItems) => {
      // Verificar se o produto j� est� no carrinho
      const existingItemIndex = currentItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Se j� existe, aumentar a quantidade
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      }

      // Se n�o existe, adicionar novo item
      const newItem: CartItemData = {
        id: product.id,
        title: product.title,
        brand: product.brand,
        price: product.price,
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
        quantity,
      };

      return [...currentItems, newItem];
    });
  }, []);

  // Remover produto do carrinho
  const removeFromCart = useCallback((productId: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }, []);

  // Atualizar quantidade de um produto
  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setItems((currentItems) => {
        const existingItemIndex = currentItems.findIndex((item) => item.id === productId);

        if (existingItemIndex >= 0) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity,
          };
          return updatedItems;
        }

        return currentItems;
      });
    },
    [removeFromCart]
  );

  // Limpar carrinho
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Verificar se um produto est� no carrinho
  const isInCart = useCallback(
    (productId: number) => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  // Obter quantidade de um produto no carrinho
  const getItemQuantity = useCallback(
    (productId: number) => {
      const item = items.find((item) => item.id === productId);
      return item ? item.quantity : 0;
    },
    [items]
  );

  const value: CartContextData = {
    items,
    itemCount,
    subtotal,
    discount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook personalizado para usar o CartContext
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export default CartContext;
