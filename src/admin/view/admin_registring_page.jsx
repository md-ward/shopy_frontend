import useAdminStore from "../store/useAdminStore";
import AdminLoginForm from "../widgets/admin_login_form";
import PasswordResetForm from "../widgets/password_reset";

const AdminRegisteringPage = () => {
    const { passwordReset } = useAdminStore();



    return (


        <div
            className="min-h-screen flex items-center justify-center relative"
            style={{
                backgroundImage: "url('/assets/admin_bg.svg')",
                backgroundSize: "contain",
                backgroundPosition: "center",
            }}



        >
            {
                passwordReset ?
                    <PasswordResetForm /> :
                    <AdminLoginForm />
            }

        </div>

    );
}




export default AdminRegisteringPage;