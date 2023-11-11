import axios from "axios";
import { API_URL } from '../../env.json';

export async function adminLogin(formData) {
    console.log(formData)
    if (formData.username=='' || formData.password=='' ) {

        throw 'please enter username and password'
    }
    try {

        const response = await axios.post(`${API_URL}/reg/admin_login`, formData);

        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export async function checkUserForPassReset(email) {

    try {
        const response = await axios.post(`${API_URL}/reg/reset_password`, { email });
        return response.data;

    } catch (error) {
        throw error.message;
    }
}
export async function confirmPinCode(pinCode) {

    try {

        const response = await axios.post(`${API_URL}/reg/confirm_pincode`, { pinCode });

        return response;
    } catch (error) {
        throw error.message;
    }
}
