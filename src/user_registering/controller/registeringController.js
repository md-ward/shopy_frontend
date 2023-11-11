import axios from "axios";
import env from "../../env.json";

export async function loginController(loginData) {
    try {
        const response = await axios.post(`${env.API_URL}/reg/login`, loginData);
        // Handle the successful login response
  
        return response.data
    } catch (error) {
        // Handle the login error
        console.error("Login failed:", error);
        throw error;
    }
}

export async function signupController(signupData) {
    try {
        const response = await axios.post(`${env.API_URL}/reg/signup`, signupData);
        // Handle the successful login response
        const { data } = response;
     
        return data;
    } catch (error) {
        // Handle the login error
        console.error("Login failed:", error);
        throw error;
    }
}