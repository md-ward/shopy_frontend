import axios from "axios";
import { getCookie } from "../../useCookie";
const URL = import.meta.env.VITE_API_URL;
async function getUserOrderes() {
  try {
    const response = await axios.get(`${URL}/order/user`, {
      headers: { Authorization: getCookie("jwt_user") },
    });
    // console.log("Orders:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting user Orders:", error.response.data.message);
  }
}

async function getUserOrdereDetails(orderId) {
  try {
    const response = await axios.get(`${URL}/order/user/${orderId}`, {
      headers: { Authorization: getCookie("jwt_user") },
    });
    // console.log("Order details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting order details:", error.response.data.message);
  }
}

async function userOrderCanceling(orderId) {
  try {
    const response = await axios.put(
      `${URL}/order/user/${orderId}`,
      { status: "Cancelled" },
      {
        headers: { Authorization: getCookie("jwt_user") },
      },
    );
    console.log("Orders:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating the status:", error.response.data.message);
  }
}

export { getUserOrdereDetails, getUserOrderes, userOrderCanceling };
