import { create } from "zustand";
import getFeaturedProducts from "../controller/homePageControllers";

const useHomeStore = create((set) => ({
  featuredProducts: [],
  isLoading: false,
  handleFeaturedProducts: async () => {
    await getFeaturedProducts().then((featuredProducts) => {
      set({ isLoading: false, featuredProducts });
    });
  },
}));
export default useHomeStore;
