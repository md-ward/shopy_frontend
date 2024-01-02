import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
async function placeAcontactUsMessage(formData, formRef) {
  try {
    await axios.post(`${URL}/contact`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    formRef.current.reset();
    alert("thanks for contacting us , will respond soon on this email ..");
  } catch (error) {
    console.error(error);
  }
}

export { placeAcontactUsMessage };
