import { Outlet } from "react-router-dom";
import DashboardSidebar, {
  BottomNavigationBar,
} from "../widgets/dashboard_sidebar";

const AdminLayout = () => {
  return (
    <section className="flex   min-h-screen flex-col sm:flex-row">
      <DashboardSidebar />
      <div className="custom-scrollbar max-h-screen w-full overflow-y-auto">
        <Outlet />
      </div>
      <BottomNavigationBar />
    </section>
  );
};

export default AdminLayout;
