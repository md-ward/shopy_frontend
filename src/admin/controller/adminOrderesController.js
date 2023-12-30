import axios from "axios";
import { getCookie } from "../../useCookie";
const URL = import.meta.env.VITE_API_URL;

async function getAdminOrderes() {
  try {
    const response = await axios.get(`${URL}/order`, {
      headers: { Authorization: getCookie("jwt_admin") },
    });
    console.log("Orders:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting categories:", error.response.data.message);
  }
}

async function getAdminOrdereDetails(orderId) {
  try {
    const response = await axios.get(`${URL}/order/${orderId}`, {
      headers: { Authorization: getCookie("jwt_admin") },
    });
    console.log("Orders:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting order details:", error.response.data.message);
  }
}

async function adminUpdateOrderStatus(orderId, status) {
  try {
    const response = await axios.put(
      `${URL}/order/${orderId}`,
      { status },
      {
        headers: { Authorization: getCookie("jwt_admin") },
      },
    );
    console.log("Orders:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating the status:", error.response.data.message);
  }
}

export { getAdminOrderes, getAdminOrdereDetails, adminUpdateOrderStatus };
