import { useRef } from "react";
import useRegistering from "../store/useRegisteringStore";
import gsap from "gsap";

const SignupForm = () => {
  const { error, handleSignupSubmit, toggleForm } = useRegistering();
  const signupRef = useRef(null);

  function handleTransintonTo() {
    gsap.fromTo(
      signupRef.current,
      { skew: 1, opacity: 1 },
      {
        skew: 0,
        opacity: 0,
        translateX: -30,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          toggleForm();
        },
      },
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const signupData = {
      email: event.target.email.value,
      password: event.target.password.value,
      name: event.target.name.value,
      // Add any additional fields you need for signup
    };

    handleSignupSubmit(signupData);
  };

  return (
    <div className="  flex h-full flex-col items-center justify-center">
      <form ref={signupRef} className="w-full max-w-xs" onSubmit={handleSubmit}>
        {/* Display error message if present */}
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-1 block text-lg text-indigo-600">
            Full name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
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

        {/* Add any additional fields for signup */}

        <button
          type="submit"
          className="custome_grad w-full rounded-md px-4 py-2 text-white shadow-md hover:shadow-inner"
        >
          Signup
        </button>
      </form>

      <div className="mt-4">
        <h1 className="mb-2 text-center">Already have an account?</h1>
        <button
          onClick={handleTransintonTo}
          className="w-full text-blue-500 hover:underline"
        >
          Login now
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
