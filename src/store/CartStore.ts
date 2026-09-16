import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Product } from '../types/Product';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  discountPercentage?: number;
  brand?: string;
}

interface CartStore {
  items: CartItem[];

  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;

  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  isInCart: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        items: [],

        // Getters
        getItemCount: () => {
          return get().items.reduce((sum, item) => sum + item.quantity, 0);
        },

        getSubtotal: () => {
          return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },

        getDiscount: () => {
          return get().items.reduce((sum, item) => {
            if (item.discountPercentage) {
              const discount = ((item.price * item.discountPercentage) / 100) * item.quantity;
              return sum + discount;
            }
            return sum;
          }, 0);
        },

        getTotal: () => {
          const subtotal = get().getSubtotal();
          const discount = get().getDiscount();
          return subtotal - discount;
        },

        // Actions
        addToCart: (product, quantity = 1) =>
          set((state) => {
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                ),
              };
            }

            const newItem: CartItem = {
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              quantity,
              discountPercentage: product.discountPercentage,
              brand: product.brand,
            };

            return { items: [...state.items, newItem] };
          }),

        removeFromCart: (productId) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== productId),
          })),

        updateQuantity: (productId, quantity) =>
          set((state) => {
            if (quantity <= 0) {
              return { items: state.items.filter((item) => item.id !== productId) };
            }
            return {
              items: state.items.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              ),
            };
          }),

        clearCart: () => set({ items: [] }),

        // Helpers
        isInCart: (productId) => {
          return get().items.some((item) => item.id === productId);
        },

        getItemQuantity: (productId) => {
          const item = get().items.find((item) => item.id === productId);
          return item?.quantity || 0;
        },
      }),
      {
        name: 'zoop-store-cart', // localStorage key
        version: 1,
      }
    ),
    {
      name: 'CartStore', // Redux DevTools name
    }
  )
);
