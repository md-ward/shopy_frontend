import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export async function loginController(loginData) {
  try {
    const response = await axios.post(`${API_URL}/reg/login`, loginData, {
      withCredentials: true,
    });
    // Handle the successful login response

    return response.data;
  } catch (error) {
    // Handle the login error
    console.error("Login failed:", error);
    throw error;
  }
}

export async function signupController(signupData) {
  try {
    const response = await axios.post(`${API_URL}/reg/signup`, signupData, {
      withCredentials: true,
    });
    // Handle the successful login response
    const { data } = response;

    return data;
  } catch (error) {
    // Handle the login error
    console.error("Login failed:", error);
    throw error;
  }
}
