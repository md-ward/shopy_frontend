import AppRouter from "./router";
import useRegistering from "./user_registering/store/useRegisteringStore";
import RegisteringPage from "./user_registering/view/registeringPage";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

function App() {
  const { isDialogOpen, isLogedIn } = useRegistering();
  const getPageMetadata = (pathname) => {
    if (pathname === "/") {
      return {
        title: "Home Page",
        description:
          "Welcome to our website. Discover a wide range of products and enjoy a seamless shopping experience.",
      };
    } else if (pathname === "/shop") {
      return {
        title: "Shop Page",
        description:
          "Browse our extensive collection of high-quality products. Find exactly what you're looking for.",
      };
    } else if (pathname === "/contact") {
      return {
        title: "Contact Us",
        description:
          "Get in touch with our friendly support team. We're here to assist you with any questions or concerns.",
      };
    } else if (pathname === "/about") {
      return {
        title: "About Us",
        description:
          "Learn about our company and our mission to provide exceptional products and services to our customers.",
      };
    } else if (pathname === "/user_logs") {
      return {
        title: "User Logs",
        description:
          "View your order logs and track the status of your purchases. Stay informed about your previous orders.",
      };
    } else if (pathname === "/admin") {
      return {
        title: "Dashboard",
        description:
          "Access the admin dashboard to manage and monitor the site's operations and settings.",
      };
    } else if (pathname === "/admin/statistics") {
      return {
        title: "Statistics",
        description:
          "View detailed statistics and analytics about the site's performance and user engagement.",
      };
    } else if (pathname === "/admin/invoice-and-billing") {
      return {
        title: "Invoice and Billing",
        description:
          "Review and manage invoices and billing information for customers and transactions.",
      };
    } else if (pathname === "/admin/add-products") {
      return {
        title: "Add New Products",
        description:
          "Add new products to the shop and expand the range of offerings available to customers.",
      };
    } else if (pathname === "/admin/orders") {
      return {
        title: "Orders",
        description:
          "Manage and fulfill customer orders efficiently. Stay organized and keep customers satisfied.",
      };
    } else if (pathname === "/admin/inventory") {
      return {
        title: "Inventory",
        description:
          "Monitor and update the inventory of products to ensure accurate stock levels and availability.",
      };
    } else if (pathname.startsWith("/admin/edit/")) {
      return {
        title: "Edit Product",
        description:
          "Edit product details and make changes to ensure accurate information and improve customer experience.",
      };
    } else if (
      pathname.startsWith("/shop") &&
      pathname.match(/\/shop\/[a-z]*[0-9]*/i)
    ) {
      // Extract the product ID from the pathname
      const productId = pathname.split("/")[2];

      return {
        title: "Product details : " + productId,
        description:
          "showing product with other useres comments and image gallery...",
      };
    }
    return {
      title: "Page Not Found",
      description:
        "Oops! The page you are looking for doesn't exist. Please check the URL and try again.",
    };
  };
  const location = useLocation();
  const { pathname } = location;
  const { title, description } = getPageMetadata(pathname);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {isDialogOpen && !isLogedIn && <RegisteringPage />}

      <AppRouter />
    </>
  );
}

export default App;
