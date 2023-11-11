import LoginForm from "../widgets/login_form";
import SignupForm from "../widgets/signup_form";
import useRegistering from "../store/useRegisteringStore";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const RegisteringPage = () => {
    const { currentForm, toggleDialog } = useRegistering();



    const regRef = useRef()
    useEffect(() => {
        gsap.fromTo(regRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 })


    }, [])


    function handleDialogClose(event) {

        if (event.target == regRef.current) {


            gsap.fromTo(regRef.current,
                { scale: 1, opacity: 1 },
                {
                    scale: 0, opacity: 0,
                    onComplete: () => {
                        toggleDialog()
                    }
                })
        }


    }

    return (

        <div
            onClick={handleDialogClose}
            ref={regRef}
            className=" select-none   w-full h-screen flex justify-center items-center   bg-gray-600 bg-opacity-50  z-10 absolute">
            <div className="lg:w-1/4 p-6 rounded-lg  shadow-inner bg-white border hover:border-indigo-500 ">
                {


                    currentForm ?
                        <LoginForm />
                        : <SignupForm />
                }
            </div>




        </div>


    );
}

export default RegisteringPage;