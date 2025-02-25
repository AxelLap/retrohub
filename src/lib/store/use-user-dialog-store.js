import { create } from "zustand";

export const useDialogStore = create((set) => ({
  isDialogOpen: false,
  setIsDialogOpen: () =>
    set((state) => ({ isDialogOpen: !state.isDialogOpen })),
}));
