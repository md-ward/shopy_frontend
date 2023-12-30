import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

// Function to search for products
const searchProducts = async (searchTerm) => {
  try {
    const response = await axios.get(
      `${URL}/products/search?searchTerm=${searchTerm}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error.message;
  }
};

// Function to filter products
const filterProducts = async (categories, minPrice, maxPrice) => {
  try {
    const params = {
      categories: categories.join(","),
      minPrice,
      maxPrice,
    };

    const response = await axios.get(`${URL}/products/filter`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error filtering products:", error);
    throw error;
  }
};

export { searchProducts, filterProducts };
