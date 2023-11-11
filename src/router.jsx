
import { Routes, Route, NavLink, Navigate, } from 'react-router-dom';

import HomePage from './home/view/home_pages'
import ProductDetail from './global/view/products_details';
import Layout from './global/view/pages_layout';
import ShopPage from './shop/view/shop_page';
import ContactUs from './contact_us/view/contact_us';
import useRegistering from './user_registering/store/useRegisteringStore';
import UserOrderLogs from './user_registering/view/user_logs';
import StatisticsPage from './admin/view/statisticsPage';
import AddProductsPage from './admin/view/add_products';
import AdminLayout from './global/view/admin_page_layout';
import useAdminStore from './admin/store/useAdminStore';
import AdminRegisteringPage from './admin/view/admin_registring_page';

const AppRouter = () => {
    return (
        <Routes >
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/shop' element={<ShopPage />}></Route>
            <Route path='/contact' element={<ContactUs />}></Route>

            <Route path='/user_logs' element={<ProtectedRoute />} />
            <Route path='/products/:productId' element={<ProductDetail />}></Route>

            <Route path='/admin' element={<AdminProtectedRoute />}>
                <Route path='/admin/statistics' element={<StatisticsPage />} />
                <Route path='/admin/add-products' element={<AddProductsPage />} />

            </Route>

            <Route path="/*" element={<NoMatch />} />

        </Routes >
    );

}

export default AppRouter;


const NoMatch = () => {
    return (
        <Layout>

            <div className="flex flex-col items-center justify-center h-screen p-7">
                <h1 className="text-5xl font-bold text-dark-blue duration-500 transition-transform jump-and-shake">
                    Error 404
                </h1>
                <p className="text-xl mt-4 ">Sorry, the page you requested could not be found.</p>
                <NavLink to="/" className="mt-4 p-2 bg-dark-blue-2 text-white rounded-md hover:bg-gray-700">
                    Go back to Home
                </NavLink>
            </div>

        </Layout>
    );
};

const AdminProtectedRoute = () => {
    const { isAdmin } = useAdminStore();

    return isAdmin ? <AdminLayout /> : <AdminRegisteringPage />



}



//! user Protected Route..........
const ProtectedRoute = () => {
    const { isLogedIn } = useRegistering();

    return (




        isLogedIn ? <UserOrderLogs /> : <Navigate to={'/'} />


    );
}

