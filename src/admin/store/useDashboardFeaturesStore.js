import { create } from "zustand";
import {
  addCategory,
  addProduct,
  getCategories,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productsController";
import useProductImageStore from "./useProductImageStore";
import {
  adminUpdateOrderStatus,
  getAdminOrdereDetails,
  getAdminOrderes,
} from "../controller/adminOrderesController";

const useDashboardFeaturesStore = create((set) => ({
  isLoading: false,
  singleProduct: null,
  products: [],
  categories: [],
  orders: [],
  singleOrderDetails: null,
  //! fetching  the Products...
  handleGettingProducts: async () => {
    set({ isLoading: true });
    await getProducts()
      .then((products) => {
        set({ isLoading: false, products });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  //! Fetching a single product by ID
  handleSingleProductDetails: async (productId, edit, formRef) => {
    try {
      console.log(edit);
      set({ isLoading: true });
      if (edit) {
        await getSingleProduct(productId).then((product) => {
          const form = formRef.current;
          for (const [key, value] of Object.entries(product)) {
            const inputField = form?.querySelector(`[name="${key}"]`);
            if (inputField) {
              inputField.value = value;
            }
          }

          const checkboxes = form.querySelectorAll(`input[type="checkbox"]`);
          const categories = String(product.category).split(",");

          if (checkboxes.length > 0) {
            checkboxes.forEach((checkbox) => {
              checkbox.checked = categories?.includes(String(checkbox.value));
            });
          }

          set({ singleProduct: product, isLoading: false });
          useProductImageStore.setState({
            selectedProductImageToAdd: product.image,
            confirmSettingProductImage: true,
          });
        });
      } else {
        await getSingleProduct(productId).then((product) => {
          set({ singleProduct: product, isLoading: false });
        });
      }
    } catch (error) {
      set({ isLoading: false });

      console.warn(error.response.data.message);
    }
  },

  //! fetching the categories....
  handleGettingCategories: async () => {
    set({ isLoading: true });
    await getCategories()
      .then((categories) => {
        set({ isLoading: false, categories });
      })
      .catch((error) => {
        set({ isLoading: false });
        console.log(error);
      });
  },
  //! handle adding the  new category
  handleAddingNewCategory: async (category) => {
    set({ isLoading: true });
    try {
      const newCategory = await addCategory(category);
      set({
        isLoading: false,
        categories: [
          ...useDashboardFeaturesStore.getState().categories,
          newCategory,
        ],
      });
    } catch (error) {
      console.error("Error creating new category:", error);
      set({ isLoading: false });
    }
  },

  //! handle adding new product
  handlePublishingNewProduct: async (product_data) => {
    set({ isLoading: true });
    try {
      await addProduct(product_data);
      set({ isLoading: false });
    } catch (error) {
      console.error("Error publishing new product:", error);
      set({ isLoading: false });
    }
  },
  //! handle Edite and update  product data
  handleUpdatingProductData: async (product_data, productId) => {
    set({ isLoading: true });
    try {
      await updateProduct(product_data, productId);
      set({ isLoading: false });
    } catch (error) {
      console.error("Error publishing new product:", error);
      set({ isLoading: false });
    }
  },
  //! handle Getting  all  Orders for admin
  handleGettingAdminOrders: async () => {
    set({ isLoading: true });
    try {
      const orders = await getAdminOrderes();
      set({ isLoading: false, orders });
    } catch (error) {
      console.error("Error publishing new product:", error);
      set({ isLoading: false });
    }
  },
  handleGettingAdminOrderDetails: async (orderId) => {
    set({ isLoading: true });
    try {
      const OrderDetails = await getAdminOrdereDetails(orderId);
      set({ isLoading: false, singleOrderDetails: OrderDetails });
    } catch (error) {
      console.error("Error getting ordere details:", error);
      set({ isLoading: false });
    }
  },
  handleUpdatingOrderStatus: async (orderId, status) => {
    set({ isLoading: true });
    try {
      const updatedOrderDetails = await adminUpdateOrderStatus(orderId, status);
      const updatedOrders = useDashboardFeaturesStore
        .getState()
        .orders.map((order) => {
          if (order._id === orderId) {
            return {
              ...order,
              orderStatus: updatedOrderDetails.orderStatus,
            };
          }
          return order;
        });
      set({
        isLoading: false,
        singleOrderDetails: updatedOrderDetails,
        orders: updatedOrders,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      set({ isLoading: false });
    }
  },
}));

export default useDashboardFeaturesStore;
