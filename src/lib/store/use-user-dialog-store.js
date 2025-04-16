import { create } from "zustand";

export const useDialogStore = create((set) => ({
  isDialogOpen: false,
  setIsDialogOpen: () =>
    set((state) => ({ isDialogOpen: !state.isDialogOpen })),
  userFormOpen: false,
  setUserFormOpen: () =>
    set((state) => ({ userFormOpen: !state.userFormOpen })),

  isDeleteWarningOpen: false,
  setIsDeleteWarningOpen: () =>
    set((state) => ({
      isDeleteWarningOpen: !state.isDeleteWarningOpen,
    })),

  itemToDeleteId: null,
  itemToDeleteImage: null,

  setItemToDelete: ({ id, image }) =>
    set(() => ({
      itemToDeleteId: id,
      itemToDeleteImage: image,
    })),

  clearItemToDelete: () =>
    set(() => ({
      itemToDeleteId: null,
      itemToDeleteImage: null,
    })),
}));
