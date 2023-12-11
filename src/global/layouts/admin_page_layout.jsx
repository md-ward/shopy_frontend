import { Outlet } from "react-router-dom";
import DashboardSidebar, {
  BottomNavigationBar,
} from "../widgets/dashboard_sidebar";
import PropTypes from "prop-types";

const AdminLayout = () => {
  return (
    <section className="flex  min-h-screen flex-col sm:flex-row">
      <DashboardSidebar />
      <Outlet />

      <BottomNavigationBar />
    </section>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.element,
};

export default AdminLayout;
