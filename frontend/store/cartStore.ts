'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color?: string;
  quantity: number;
  maxStock: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === newItem.id && item.size === newItem.size
        );

        let updatedItems;
        if (existingItemIndex >= 0) {
          updatedItems = currentItems.map((item, index) =>
            index === existingItemIndex
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, item.maxStock),
                }
              : item
          );
        } else {
          updatedItems = [...currentItems, { ...newItem, quantity: 1 }];
        }

        const newTotal = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({ items: updatedItems, total: newTotal });
      },

      removeItem: (id, size) => {
        const updatedItems = get().items.filter(
          (item) => !(item.id === id && item.size === size)
        );
        const newTotal = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        set({ items: updatedItems, total: newTotal });
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }

        const updatedItems = get().items.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.min(quantity, item.maxStock) }
            : item
        );

        const newTotal = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({ items: updatedItems, total: newTotal });
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);