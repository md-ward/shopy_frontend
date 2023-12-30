import axios from "axios";
import { getCookie } from "../../useCookie";
const URL = import.meta.env.VITE_API_URL;

async function getCart() {
  try {
    const response = await axios.get(`${URL}/cart`, {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type, Set-Cookie",
      },
      withCredentials: true,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data.message);
  }
}

async function addToCart(productId, quantity) {
  try {
    const cart = {
      productId,
      quantity,
    };

    console.log(cart);
    const response = await axios.post(`${URL}/cart/add`, cart, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type, Set-Cookie",
      },
      withCredentials: true,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data.message);
  }
}

async function placeOrder(orderData) {
  const userToken = getCookie("jwt_user");
  try {
    const response = await axios.post(`${URL}/order/add`, orderData, {
      headers: {
        Authorization: userToken,
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("New order added:", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export { addToCart, getCart, placeOrder };
