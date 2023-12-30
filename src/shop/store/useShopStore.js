import { create } from "zustand";
import {
  filterProducts,
  searchProducts,
} from "../controllers/searchAndFiltersController";

const useShopStore = create((set) => ({
  isLoading: false,
  error: "",
  filteredProducts: [],
  searchResults: [],
  selectedCategories: [],
  handleSelectCategory: (category) => {
    set((state) => {
      const updatedCategories = [...state.selectedCategories];
      const categoryIndex = updatedCategories.indexOf(category);

      if (categoryIndex !== -1) {
        // Category is already selected, remove it
        updatedCategories.splice(categoryIndex, 1);
      } else {
        // Category is not selected, add it
        updatedCategories.push(category);
      }

      return { selectedCategories: updatedCategories };
    });
  },
  handleSearchForProducts: async (searchTerm) => {
    set({ isLoading: true });
    await searchProducts(searchTerm)
      .then((data) => {
        set({ searchResults: data, isLoading: false });
      })
      .catch((error) => {
        set({ error, isLoading: false });
      });
  },
  handleGettingFilteredProducts: async () => {
    await filterProducts(useShopStore.getState().selectedCategories).then(
      (data) => {
        set({ filteredProducts: data });
      },
    );
  },
  resetSearch: () => {
    set({ searchResults: [] });
  },
  resetFilters: () => {
    set({ selectedCategories: [], filteredProducts: [] });
  },
}));

export default useShopStore;
