
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../widgets/dashboard_sidebar";
import PropTypes from "prop-types";

const AdminLayout = () => {
    return (
        <section className="min-h-screen  flex">
            <DashboardSidebar />
            <Outlet />
        </section>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.element
}

export default AdminLayout;