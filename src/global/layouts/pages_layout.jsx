import Navbar from "../widgets/nav_bar";
import Footer from "../widgets/footer";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Navbar />

      <div className="lg:min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
