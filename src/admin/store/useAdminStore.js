import { create } from "zustand";
import {
  adminLogin,
  checkUserForPassReset,
  confirmPinCode,
} from "../controller/adminController";
import { getCookie, setCookie } from "../../useCookie";
const useAdminStore = create((set) => ({
  isAdmin: getCookie("jwt_admin") || false,
  passwordReset: false,
  pinCode: null,

  setPasswordReset: (state) => {
    set({ passwordReset: state });
  },
  error: null,
  setError: (error) => {
    set({ error: error });
  },
  handleLogin: async (formData) => {
    await adminLogin(formData)
      .then((jwt_admin) => {
        setCookie("jwt_admin", jwt_admin);
        set({ isAdmin: true });
      })
      .catch((error) => {
        set({ error: error });
      });
  },
  handleCheckUserEmail: async (email) => {
    try {
      const response = await checkUserForPassReset(email);
      set({ pinCode: response.message });
    } catch (error) {
      set({ error: error });
    }
  },

  handleConfirmPincode: async (enteredPinCode) => {
    await confirmPinCode(enteredPinCode)
      .then((res) => {
        const token = res.headers.token;
        console.warn(token);
        const newWindow = window.open("", "_blank");
        newWindow.document.open();
        newWindow.document.write(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  },
}));

export default useAdminStore;
