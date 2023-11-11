import { useRef } from "react";
import useAdminStore from "../store/useAdminStore";

const PasswordResetForm = () => {
    const { setPasswordReset, handleCheckUserEmail, pinCode } = useAdminStore();

    const formRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const email = formData.get("email");
        handleCheckUserEmail(email);
    };

    const handleGoBack = () => {
        setPasswordReset(false);
    };

    return (
        <div className="bg-white max-w-lg p-8 rounded shadow-md">
            <div className="flex items-center mb-4">
                <img src="/assets/admin.svg" alt="" className="w-40 mx-auto" />
                <h1 className="text-3xl font-bold mb-4 text-center text-indigo-700">
                    Admin Login
                </h1>
            </div>

            {pinCode && (
                <div>
                    <p className=" mb-4">
                        An email with a PIN code has been sent to your email address.
                        Please copy the PIN code and enter it below.
                    </p>
                    <p className="ml-2">
                This demo implementation is for demonstration purposes only and may not be applicable for real-life projects.
            </p>
                    <p className="text-center text-indigo-700 font-bold mb-4">
                        PIN Code: {pinCode}
                    </p>
                </div>
            )}

            {!pinCode ? (
                <form onSubmit={handleSubmit} ref={formRef}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                    />
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-indigo-700 text-white py-2 px-4 rounded hover:bg-indigo-800"
                        >
                            Reset Password
                        </button>
                        <button
                            type="button"
                            onClick={handleGoBack}
                            className="text-indigo-700 underline"
                        >
                            Go Back
                        </button>
                    </div>
                </form>
            ) : (
                <ConfirmPin />
            )}
        </div>
    );
};

export default PasswordResetForm;


const ConfirmPin = () => {
    const { handleConfirmPincode } = useAdminStore();

    const pinRef = useRef();

    const handleSubmit = (event) => {
        console.log('pin code ')
        event.preventDefault();
        const formData = new FormData(pinRef.current);
        const enteredPinCode = formData.get("pinCode");
        handleConfirmPincode(enteredPinCode);
        pinRef.current.reset();
    };

    return (
        <form onSubmit={handleSubmit} ref={pinRef}>
            <label htmlFor="pinCode">Enter Received PIN Code:</label>
            <input
                type="text"
                id="pinCode"
                name="pinCode"
                required
                className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
            />
            <div className="flex justify-between">
                <button
                    type="submit"
                    className="bg-indigo-700 text-white py-2 px-4 rounded hover:bg-indigo-800"
                >
                    Confirm
                </button>
            </div>
        </form>
    );
}

