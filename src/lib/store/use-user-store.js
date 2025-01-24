import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist((set) => ({
    user: null,
    isAdmin: false,
    login: (newUser) => set({ user: newUser, isAdmin: newUser === "admin" }),
    logout: () => set({ user: "", isAdmin: false }),
  })),
  { name: "userName" }
);
