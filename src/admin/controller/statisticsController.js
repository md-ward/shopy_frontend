import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export default async function fetchStatistics() {
  try {
    const response = await axios.get(`${URL}/reg/statistics`);
    if (response.status != 200) {
      return { valid: false, value: "Something went worng" };
    } else {
      return { valid: true, value: response.data };
    }
  } catch (error) {
    return error.response.message;
  }
}
export async function fetchContactUsMessages() {
  try {
    const response = await axios.get(`${URL}/contact`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.message;
  }
}

export async function deleteContactUsMessage(messageId) {
  try {
    const response = await axios.delete(`${URL}/contact/${messageId}`);
    console.log(response.data);
  } catch (error) {
    return error.response.message;
  }
}
