import { create } from "zustand";

export const useFilterStore = create((set) => ({
  isFiltersMenuOpen: false,
  toggleFilterMenu: () =>
    set((state) => ({ isFiltersMenuOpen: !state.isFiltersMenuOpen })),
  catFilter: null,
  setCatFilter: (newFilter) => set({ catFilter: newFilter }),
  constrFilter: null,
  setConstrFilter: (newFilter) => set({ constrFilter: newFilter }),
}));
