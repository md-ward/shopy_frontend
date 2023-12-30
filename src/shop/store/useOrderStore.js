import { create } from "zustand";
import { placeOrder } from "../../cart/controller/cartController";
import {
  getUserOrdereDetails,
  getUserOrderes,
  userOrderCanceling,
} from "../controllers/userlogsController";

const useOrderStore = create((set) => ({
  isLoading: false,
  message: { error: false, success: false, content: null },
  orders: [],
  userOrderDetails: null,

  handlePlacingOrder: async (orderData) => {
    set({ isLoading: true });
    await placeOrder(orderData)
      .then((data) => {
        console.log(data);
        set({
          message: {
            success: true,
            content:
              "Ordere placed successfully and it's under processing , you have the right to cancle the ordere within the first 12H",
          },
        });
      })
      .catch((error) => {
        set({ message: { error: true, content: error } });
      })
      .finally(() => {
        set({ isLoading: false });
        setTimeout(() => {
          set({ message: { error: false, success: false, content: null } });
        }, 2500);
      });
  },

  handleGettingUserOrderDetails: async (orderId) => {
    set({ isLoading: true });
    try {
      await getUserOrdereDetails(orderId).then((details) => {
        set({ isLoading: false, userOrderDetails: details });
      });
    } catch (error) {
      console.error("Error getting ordere details:", error);
      set({ isLoading: false });
    }
  },

  //! handle Getting  all  Orders for user
  handleGettingUserOrders: async () => {
    set({ isLoading: true });
    try {
      const orders = await getUserOrderes();
      set({ isLoading: false, orders });
    } catch (error) {
      console.error("Error publishing new product:", error);
      set({ isLoading: false });
    }
  },
  //! Enable user to cancel the order within  first  12 h
  hadnleOrderCanceling: async (orderId) => {
    set({ isLoading: true });
    try {
      const updatedOrderDetails = await userOrderCanceling(orderId);
      const updatedOrders = useOrderStore.getState().orders.map((order) => {
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
        userOrderDetails: updatedOrderDetails,
        orders: updatedOrders,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      set({ isLoading: false });
    }
  },
}));

export default useOrderStore;
