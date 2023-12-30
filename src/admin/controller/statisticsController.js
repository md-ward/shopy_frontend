import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export default async function fetchStatistics(setStatistics) {
  try {
    const response = await axios.get(`${URL}/reg/statistics`);
    console.log(response.data);
    setStatistics(response.data);
  } catch (error) {
    return error.response.message;
  }
}
