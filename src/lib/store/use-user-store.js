import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      userImage: null, // On stocke l'image de profil
      isAdmin: false,
      login: (newUser, userImage) =>
        set({ user: newUser, userImage, isAdmin: newUser === "admin" }),
      logout: () => set({ user: "", userImage: null, isAdmin: false }),
    }),
    { name: "userStore" }
  )
);
