import { useRef } from "react";
import useRegistering from "../store/useRegisteringStore";
import gsap from "gsap";

const LoginForm = () => {
  const { error, handleLoginSubmit, toggleForm } = useRegistering((state) => ({
    error: state.error,
    handleLoginSubmit: state.handleLoginSubmit,
    toggleForm: state.toggleForm


  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    handleLoginSubmit(loginData);
  };

  const loginRef = useRef(null);

  function handleTransintonTo() {
    gsap.fromTo(
      loginRef.current,
      { skew: 1, opacity: 1 },
      {
        skew: 0,
        opacity: 0,
        translateX: 30,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          toggleForm();
        },
      },
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <form ref={loginRef} className="w-full max-w-xs" onSubmit={handleSubmit}>
        {/* Display error message if present */}

        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-lg text-indigo-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Password field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1 block text-lg text-indigo-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {error && <div className="mb-4 text-center text-red-500">{error}</div>}
        <button
          type="submit"
          className="custome_grad w-full rounded-md px-4 py-2 text-white shadow-md  hover:shadow-inner"
        >
          Login
        </button>
      </form>

      <div className="mt-4">
        <h1 className="mb-2 text-center">Don&apos;t have an account?</h1>
        <button
          onClick={handleTransintonTo}
          className="w-full text-blue-500 hover:underline"
        >
          Register now
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
