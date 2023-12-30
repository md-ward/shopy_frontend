import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import LoginForm from "../widgets/login_form";
import SignupForm from "../widgets/signup_form";
import useRegistering from "../store/useRegisteringStore";
import Loader from "../../global/widgets/loader";

const RegisteringPage = () => {
  const { currentForm, toggleDialog, isLoading } = useRegistering();
  const regRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      regRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5 },
    );
  }, []);

  function handleDialogClose(event) {
    if (event.target === regRef.current) {
      gsap.fromTo(
        regRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            toggleDialog();
          },
        },
      );
    }
  }

  const path = useLocation().pathname;

  return (
    <div
      onClick={handleDialogClose}
      ref={regRef}
      className="absolute z-50 isolate flex h-screen w-full select-none items-center justify-center bg-gray-600 bg-opacity-50"
    >
      <div className="rounded-lg border bg-white p-6 shadow-inner hover:border-indigo-500 lg:w-1/4">
        {path === "/cart" && (
          <span className=" text-center">
            <h1 className="mb-2 text-2xl font-bold">Not Logged in Yet</h1>
            <p>Please register to proceed to checkout</p>
          </span>
        )}
        {currentForm ? <LoginForm /> : <SignupForm />}
        {isLoading && <span className="flex justify-center mt-2"><Loader /></span>}{" "}
      </div>
    </div>
  );
};

export default RegisteringPage;
