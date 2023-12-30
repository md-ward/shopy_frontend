import axios from "axios";
import { getCookie } from "../../useCookie";

const URL = import.meta.env.VITE_API_URL;
async function getComment(productId, limit) {
  try {
    const response = await axios.get(
      `${URL}/comments/${productId}?limit=${limit}`,
    );
    console.log(response.data.comments);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
}
async function addComment(comment, productId) {
  try {
    const response = await axios.post(
      `${URL}/comments/${productId}`,
      { comment },
      {
        headers: { Authorization: getCookie("jwt_user") },
      },
    );
    console.log(response.data);
    return response.data.comments;
  } catch (error) {
    console.log(error.response.data.message);
  }
}

export { addComment, getComment };
