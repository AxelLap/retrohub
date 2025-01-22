import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist((set) => ({
    user: null,
    login: (newUser) => set({ user: newUser }),
    logout: () => set({ user: "" }),
  })),
  { name: "userName" }
);
