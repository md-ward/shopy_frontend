import axios from "axios";
import { API_URL } from "../../env.json";

async function uploadImage(formData, onUploadProgress) {
  try {
    const { imageName, imageAlt, image } = formData;

    const data = new FormData();
    data.append("image", image);
    data.append("imageName", imageName);
    data.append("imageAlt", imageAlt);
    const response = await axios.post(API_URL + "/admin/upload", data, {
      headers: {
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
    console.log("Error:", error.message);
    // Handle error and display error message
    throw error;
  }
}

async function getProductsImages() {
  try {
    const response = await axios.get(API_URL + "/admin/images/thumbs");

    return response.data;
  } catch (error) {
    // console.log("Error:", error.message);
    throw "Failed to fetch thumbnails "

    // Handle error and display error message
  }
}

export { uploadImage, getProductsImages };
