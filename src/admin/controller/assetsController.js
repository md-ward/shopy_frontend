import axios from "axios";
import { getCookie } from "../../useCookie";
const URL = import.meta.env.VITE_API_URL;

async function uploadImage(formData, onUploadProgress) {
  try {
    const { imageName, imageAlt, image } = formData;

    const data = new FormData();
    data.append("image", image);
    data.append("imageName", imageName);
    data.append("imageAlt", imageAlt);
    const response = await axios.post(URL + "/admin/upload", data, {
      headers: {
        Authorization: getCookie("jwt_admin"),
        "Content-Type": "multipart/form-data",
        "Cache-Control": "max-age=3600",
      },
      onUploadProgress: onUploadProgress,
    });

    if (response.status === 200) {
      return response.data.new_image;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.log("Error:", error.response.data.message);
    // Handle error and display error message
    throw error.response.data.message;
  }
}

async function getProductsImages() {
  try {
    const response = await axios.get(URL + "/admin/images/thumbs");

    return response.data;
  } catch (error) {
    throw "Failed to fetch thumbnails ";

    // Handle error and display error message
  }
}

export { uploadImage, getProductsImages };
