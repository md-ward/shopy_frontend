import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

function calculateTotalPrice(cart) {
  const totalPrice = cart.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0,
  );
  return totalPrice;
}

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      total: 0,
      itemQuantity: (productId) => {
        return (
          useCartStore
            .getState()
            .cart.find((item) => item.productId === productId)?.quantity || null
        );
      },
      calculateTotalPrice: () => {
        const totalPrice = calculateTotalPrice(useCartStore.getState().cart);
        set({ total: totalPrice });
      },
      handleCheckProductInCart: (productId) => {
        const isProductExisted = useCartStore
          .getState()
          .cart.find((item) => item.productId === productId);
        return [
          Boolean(isProductExisted),
          isProductExisted ? isProductExisted.quantity : 0,
        ];
      },

      handleAddProductToCart: (productId, quantity, thumbnail, name, price) => {
        const isProductExisted = useCartStore
          .getState()
          .cart.find((item) => item.productId === productId);

        if (isProductExisted) {
          const updatedCart = useCartStore.getState().cart.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item,
          );

          set({ cart: updatedCart });
        } else {
          const updatedCart = [
            ...useCartStore.getState().cart,
            { productId, quantity, thumbnail, name, price },
          ];

          set({ cart: updatedCart });
        }

        useCartStore.getState().calculateTotalPrice();
      },

      handleUpdatingItemQuantity: (action, productId) => {
        const updatedCart = useCartStore.getState().cart.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity:
                  action === "increase"
                    ? item.quantity + 1
                    : action === "decrease"
                      ? item.quantity - 1
                      : item.quantity,
              }
            : item,
        );

        set({ cart: updatedCart });

        useCartStore.getState().calculateTotalPrice();
      },

      handleRemoveItem: (productId) => {
        const updatedCart = useCartStore
          .getState()
          .cart.filter((item) => item.productId !== productId);

        set({ cart: updatedCart });

        useCartStore.getState().calculateTotalPrice();
      },
      handleClearCart: () => {
        set({ cart: [] });
        localStorage.removeItem("cart");

        useCartStore.getState().calculateTotalPrice();
      },
    }),
    {
      name: "cart-storage", // Name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // Storage mechanism (localStorage in this example)
    },
  ),
);

export default useCartStore;
