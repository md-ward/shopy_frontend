import axios from "axios";
import { getCookie } from "../../useCookie";

const URL = import.meta.env.VITE_API_URL;

async function getProducts() {
  try {
    const response = await axios.get(`${URL}/products`);
    console.log("Products:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting categories:", error.response.data.message);
  }
}

async function getSingleProduct(productId) {
  try {
    const response = await axios.get(`${URL}/products/get/${productId}`);
    // console.log("Products:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting categories:", error.response.data.message);
  }
}

async function addProduct(productData) {
  const adminToken = getCookie("jwt_admin");
  try {
    const response = await axios.post(`${URL}/products/add`, productData, {
      headers: {
        Authorization: adminToken,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("New product added:", response.data);
  } catch (error) {
    console.error("Error adding product:", error.response.data.message);
  }
}
async function updateProduct(productData, productId) {
  const adminToken = getCookie("jwt_admin");
  try {
    const response = await axios.put(
      `${URL}/products/update/${productId}`,
      productData,
      {
        headers: {
          Authorization: adminToken,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("New product added:", response.data);
  } catch (error) {
    console.error("Error adding product:", error.response.data.message);
  }
}

async function getCategories() {
  try {
    const response = await axios.get(`${URL}/categories`);
    // console.log("Categories:", response.data);
    return response.data.categories;
  } catch (error) {
    console.error("Error getting categories:", error.response.data.message);
  }
}

async function addCategory(category) {
  try {
    const adminToken = getCookie("jwt_admin");
    const response = await axios.post(
      `${URL}/categories/add`,
      { category },
      {
        headers: {
          Authorization: adminToken,
          "Content-Type": "application/json",
        },
      },
    );
    console.log("New category added:", response.data);
    return response.data;
    // Handle success or perform additional operations
  } catch (error) {
    console.error("Error adding category:", error.response.data.message);
    // Handle error or display error message
  }
}

export {
  getSingleProduct,
  getProducts,
  addProduct,
  getCategories,
  addCategory,
  updateProduct,
};
