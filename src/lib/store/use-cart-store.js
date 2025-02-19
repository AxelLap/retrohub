import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: {},

      addItem: (newItem) => {
        set((state) => ({
          items: { ...state.items, [newItem.id]: newItem },
        }));
      },

      removeItem: (item) => {
        set((state) => {
          const updatedItems = { ...state.items };
          delete updatedItems[item.id];
          return { items: updatedItems };
        });
      },

      countItems: () => Object.keys(get().items).length,

      calculateCartPrice: () =>
        Object.values(get().items).reduce(
          (total, item) => total + item.price,
          0
        ),
    }),
    {
      name: "cart-items",
      storage: createJSONStorage(() => localStorage), // Utilise localStorage uniquement côté client
    }
  )
);
