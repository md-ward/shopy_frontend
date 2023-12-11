import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import HomePage from "./home/view/home_pages";
import ProductDetail from "./global/view/products_details";
import ShopPage from "./shop/view/shop_page";
import ContactUs from "./contact_us/view/contact_us";
import useRegistering from "./user_registering/store/useRegisteringStore";
import UserOrderLogs from "./user_registering/view/user_logs";
import StatisticsPage from "./admin/view/statisticsPage";
import AddProductsPage from "./admin/view/add_products";
import useAdminStore from "./admin/store/useAdminStore";
import AdminRegisteringPage from "./admin/view/admin_registring_page";
import InvintoryPage from "./admin/view/invintory_page";
import InvoiceAndBilling from "./admin/view/invoice_and_billing_page";
import OrdersPage from "./admin/view/orders_page";
import AdminLayout from "./global/layouts/admin_page_layout";
import Layout from "./global/layouts/pages_layout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />}></Route>

        <Route path="/shop" element={<ShopPage />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>

        <Route path="/user_logs" element={<ProtectedRoute />} />
        <Route path="/products/:productId" element={<ProductDetail />}></Route>
        <Route path="/*" element={<NoMatch />} />
      </Route>
      <Route path="/admin" element={<AdminProtectedRoute />}>
        <Route path="/admin/statistics" element={<StatisticsPage />} />
        <Route path="/admin/add-products" element={<AddProductsPage />} />
        <Route path="/admin/inventory" element={<InvintoryPage />} />
        <Route
          path="/admin/invoice-and-billing"
          element={<InvoiceAndBilling />}
        />
        <Route path="/admin/orders" element={<OrdersPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

const NoMatch = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-7">
      <h1 className="text-dark-blue jump-and-shake text-5xl font-bold transition-transform duration-500">
        Error 404
      </h1>
      <p className="mt-4 text-xl ">
        Sorry, the page you requested could not be found.
      </p>
      <NavLink
        to="/"
        className="bg-dark-blue-2 mt-4 rounded-md p-2 text-white hover:bg-gray-700"
      >
        Go back to Home
      </NavLink>
    </div>
  );
};

const AdminProtectedRoute = () => {
  const { isAdmin } = useAdminStore();

  return isAdmin ? <AdminLayout /> : <AdminRegisteringPage />;
};

//! user Protected Route..........
const ProtectedRoute = () => {
  const { isLogedIn } = useRegistering();

  return isLogedIn ? <UserOrderLogs /> : <Navigate to={"/"} />;
};
