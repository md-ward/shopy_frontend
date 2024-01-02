import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

async function getFeaturedProducts() {
  try {
    const response = await axios.get(`${URL}/products/featured/`);
    console.log("Products:", response.data.products);
    return response.data.products;
  } catch (error) {
    console.error("Error getting categories:", error.response.data.message);
  }
}

export default getFeaturedProducts;
