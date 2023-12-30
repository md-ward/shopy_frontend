import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useOrderStore from "../../shop/store/useOrderStore";
import useCartStore from "../store/useCartStore";
import Loader from "../../global/widgets/loader";
const CheckoutForm = ({ setCheckout }) => {
  const formRef = useRef();
  const checkoutRef = useRef();
  useEffect(() => {
    gsap.fromTo(
      checkoutRef.current,
      { opacity: 0, translateX: 40, height: 0, scaleY: 0, borderRadius: 0 },
      {
        opacity: 1,
        translateX: 0,
        height: "auto",
        duration: 0.6,
        scaleY: 1,
        borderRadius: 5,
      },
    );
  }, []);
  const { isLoading, handlePlacingOrder, message } = useOrderStore((state) => ({
    isLoading: state.isLoading,
    handlePlacingOrder: state.handlePlacingOrder,
    message: state.message,
  }));
  const { cart, handleClearCart } = useCartStore((state) => ({
    cart: state.cart,
    handleClearCart: state.handleClearCart,
  }));
  useEffect(() => {
    const unsubscribe = useOrderStore.subscribe((currentState, prevState) => {
      if (
        prevState.message.error === false &&
        currentState.message.error === false
      ) {
        handleClearCart();
      }
    });

    return unsubscribe;
  }, [handleClearCart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const products = cart.map((product) => {
      return {
        productId: product.productId,
        quantity: product.quantity,
      };
    });
    formData.append("products", JSON.stringify(products));
    handlePlacingOrder(formData);
    formRef.current.reset();
  };

  return (
    <div ref={checkoutRef} className="input-field  relative bg-white  p-8 ">
      {isLoading && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center  bg-slate-100/30">
          <Loader />
        </div>
      )}

      {<center>{message.content}</center>}

      {message.content == null && (
        <>
          <h1 className="text-grad mb-4 inline-block">Checkout</h1>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="mb-2 block text-lg">Phone Number </label>
              <input
                title="*Add a valid phone number"
                pattern="[0-9]+"
                name="phone"
                type="phone"
                className="w-full  rounded-md border border-gray-300 px-4 py-2 focus:invalid:!border-red-500"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-lg">Address</label>
              <input
                name="address"
                type="text"
                className="w-full rounded-md border border-gray-300 px-4 py-2"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-lg">City</label>
                <input
                  name="city"
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-lg">Zip Code</label>
                <input
                  name="zip"
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="custome_grad rounded px-4 py-2 font-bold text-white"
            >
              Place Order
            </button>
          </form>
        </>
      )}
      <button
        className="mt-2  aspect-square w-8 rounded-full bg-indigo-500 text-white ring-1 ring-indigo-600 duration-200 ease-in-out hover:bg-indigo-600 hover:ring-indigo-500 "
        onClick={() => setCheckout(false)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
};

CheckoutForm.propTypes = {
  setCheckout: PropTypes.func.isRequired,
};

export default CheckoutForm;
