import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: {},
  addItem: (newItem) => {
    set((state) => {
      const itemId = newItem.id;
      if (state.items[itemId]) {
        state.items[itemId] = {
          quantity: state.items[itemId].quantity + 1,
          newItem,
        };
      } else {
        state.items[itemId] = {
          quantity: 1,
          newItem,
        };
      }

      return {
        items: { ...state.items },
      };
    });
  },
  removeItem: (item) => {
    set((state) => {
      const itemId = item.id;
      if (!state.items[itemId]) {
        return {};
      }
      state.items[itemId] = {
        quantity: state.items[itemId].quantity - 1,
        item,
      };

      if (state.items[itemId].quantity <= 0) {
        delete state.items[itemId];
      }
      return {
        items: { ...state.items },
      };
    });
  },
}));
