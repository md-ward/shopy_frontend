import { create } from "zustand";
import {
  loginController,
  signupController,
} from "../controller/registeringController";
import { getCookie, setCookie } from "../../global/cookies/settings_cookies";

const useRegistering = create((set) => ({
  isLoading: false,
  isLogedIn: getCookie("jwt_user") || false,
  currentForm: true,
  isDialogOpen: false,
  loginData: null,
  signupData: null,
  error: null,

  toggleDialog: () => {
    set((state) => ({ isDialogOpen: !state.isDialogOpen }));
    if (
      useRegistering.loginData ||
      useRegistering.signupData ||
      useRegistering.error != null
    ) {
      set({ signupData: null, loginData: null, error: null });
    }
  },
  toggleForm: () => {
    set({ signupData: null, loginData: null, error: null });
    set((state) => ({ currentForm: !state.currentForm }));
  },
  handleLoginSubmit: async (data) => {
    set({ isLoading: true });
    if (data.username === "" || data.password === "") {
      set(() => ({ error: "Please fill in all fields" }));
      return;
    }

    loginController(data)
      .then((jwt_user) => {
        setCookie("jwt_user", jwt_user);
        set(() => ({
          isLoading: false,
          loginData: data,
          error: null,
          isDialogOpen: false,
          currentForm: true,
          isLogedIn: true,
        }));
      })
      .catch((error) => {
        // Handle the login error
        console.error("Login failed:", error);
        set(() => ({ error: "Login failed. Please try again." }));
      });
  },
  handleSignupSubmit: (data) => {
    set({ isLoading: true });

    if (data.name === "" || data.password === "" || data.email === "") {
      set(() => ({ error: "Please fill in all fields" }));
      return;
    }
    signupController(data)
      .then((jwt_user) => {
        setCookie("jwt_user", jwt_user);
        set(() => ({
          isLoading: false,
          signupData: data,
          error: null,
          isDialogOpen: false,
          currentForm: true,
          isLogedIn: true,
        }));
      })
      .catch((error) => {
        // Handle the login error
        console.error("Signup failed:", error);
        set(() => ({ error: "Signup failed. Please try again." }));
      });
  },
}));

export default useRegistering;
