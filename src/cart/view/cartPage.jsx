import useCartStore from "../store/useCartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import CheckoutForm from "./checkoutPage";
import { useEffect, useState } from "react";
import useRegistering from "../../user_registering/store/useRegisteringStore";
import useOrderStore from "../../shop/store/useOrderStore";
import { useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const CartPage = () => {
  const {
    cart,
    total,
    handleUpdatingItemQuantity,
    handleClearCart,
    handleRemoveItem,
  } = useCartStore();

  //! if user not logedin ,show the login form ....
  const { toggleDialog, isLogedIn } = useRegistering();
  //! toggle between cart summery and checkout ..
  const [checkout, setCheckout] = useState(false);

  const navigate = useNavigate();
  function handleNavToProductPage(productId) {
    navigate(`/shop/${productId}`);
  }

  function handleCheckout() {
    if (isLogedIn) {
      setCheckout(true);
    } else {
      toggleDialog();
    }
  }

  //?added listener to the checkout api handler
  //! 1- if the ordere been palced sucessfully will show confirm message then after 2.5s will reset cart
  //? 2- if the ordere been palced with error it will show error message then after 2.5s will toggle to cart summary
  useEffect(() => {
    const unsubscribe = useOrderStore.subscribe((currentState, prevState) => {
      if (
        (prevState.message.success == true &&
          currentState.message.success == false) ||
        (prevState.message.error == true && currentState.message.error == false)
      ) {
        setCheckout(false);
      }
    });

    return unsubscribe;
  }, [setCheckout]);

  return (
    <div className="flex h-full w-full  flex-col lg:flex-row ">
      <section className="bg-white p-8 lg:w-2/3">
        <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
        {/* show products */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
          {cart.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border bg-white p-4 shadow-md"
            >
              <FontAwesomeIcon
                icon={faEye}
                className="cursor-pointer"
                onClick={() => handleNavToProductPage(item.productId)}
              />
              <img
                src={item.thumbnail}
                alt={item.name}
                className="mb-4 h-36 w-full object-contain"
              />
              <div className="mb-2 flex items-center justify-between">
                <span className="line-clamp-2 text-lg font-semibold">
                  {item.name}
                </span>
                <span className="text-lg font-semibold">${item.price}</span>
              </div>
              <div className="flex  items-center justify-between">
                <div className="flex  items-center gap-1">
                  <button
                    disabled={1 > item.quantity - 1}
                    onClick={() =>
                      handleUpdatingItemQuantity("decrease", item.productId)
                    }
                    className="rounded-l-full bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="rounded-md border border-black  px-4 py-2 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdatingItemQuantity("increase", item.productId)
                    }
                    className="rounded-r-full bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handleClearCart}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>
      </section>
      <section className="right-2 top-0 mt-1 flex h-fit flex-col justify-between rounded-md  border border-indigo-600 bg-gray-100 p-8 lg:sticky lg:w-1/3">
        {checkout ? (
          <CheckoutForm setCheckout={setCheckout} />
        ) : (
          <>
            <h1 className="mb-4 border-b-2 border-indigo-500 text-center text-xl">
              Summary
            </h1>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">${total}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="custome_grad rounded px-4 py-2 font-bold text-white"
            >
              Checkout
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default CartPage;
