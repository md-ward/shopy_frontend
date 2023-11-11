import { useRef } from "react";
import useRegistering from "../store/useRegisteringStore";
import gsap from "gsap";

const SignupForm = () => {

    const { error, handleSignupSubmit, toggleForm } = useRegistering();
    const signupRef = useRef(null);

    function handleTransintonTo() {

        gsap.fromTo(signupRef.current, { skew: 1, opacity: 1 }, {
            skew: 0, opacity: 0, translateX: -30, onComplete: () => {
                toggleForm()

            }
        })

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
        <div className="  flex flex-col justify-center items-center h-full">

            <form ref={signupRef} className="w-full max-w-xs" onSubmit={handleSubmit}>
                {/* Display error message if present */}
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                {/* Email field */}
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 text-indigo-600 text-lg">Full name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        className="rounded-md border border-gray-300 px-3 py-2 w-full"
                    />
                </div>
                {/* Email field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 text-indigo-600 text-lg">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="rounded-md border border-gray-300 px-3 py-2 w-full"
                    />
                </div>

                {/* Password field */}
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1 text-indigo-600 text-lg">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="rounded-md border border-gray-300 px-3 py-2 w-full"
                    />
                </div>



                {/* Add any additional fields for signup */}

                <button
                    type="submit"
                    className="custome_grad shadow-md hover:shadow-inner text-white rounded-md px-4 py-2 w-full"
                >
                    Signup
                </button>
            </form>

            <div className="mt-4">
                <h1 className="mb-2 text-center">Already have an account?</h1>
                <button onClick={handleTransintonTo} className="text-blue-500 hover:underline w-full">Login now</button>
            </div>
        </div>
    );
};

export default SignupForm;