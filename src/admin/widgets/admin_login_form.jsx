import { useRef } from "react";
import useAdminStore from "../store/useAdminStore";

const AdminLoginForm = () => {
    const formRef = useRef(null);
    const { handleLogin, setPasswordReset, error } = useAdminStore();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        const username = formData.get("username");
        const password = formData.get("password");



        handleLogin({ username, password })

        // Reset the form
        formRef.current.reset();
    };

    return (

        <div className="bg-white max-w-lg p-8 rounded shadow-md">
            <span>
                <img src="/assets/admin.svg" alt="" className="w-40 mx-auto" />
                <h1 className="text-3xl font-bold mb-4 text-center text-indigo-700">
                    Admin Login
                </h1>
            </span>
            <form ref={formRef} onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="username">
                        Username:
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                </div>
                {error && <h1 className="text-red-500" >{error}</h1>}

                <button
                    type="submit"
                    className="custome_grad  shadow-md hover:shadow-inner w-full text-white font-semibold px-4 py-2 rounded"
                >
                    Login
                </button>

                <button

                    onClick={() => setPasswordReset(true)}
                    type="button" className="underline text-blue-500 text-center w-full mt-4">Forgot your password..?</button>

            </form>
        </div>

    );
};

export default AdminLoginForm;



