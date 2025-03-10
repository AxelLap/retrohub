import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      userImage: null, // On stocke l'image de profil

      login: (newUser, userImage) =>
        set({ user: newUser, userImage: userImage }),
      logout: () => set({ user: "", userImage: null }),
    }),
    { name: "userStore" }
  )
);
