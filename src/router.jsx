
import { Routes, Route, NavLink } from 'react-router-dom';

import HomePage from './home/view/home_pages'
import ProductDetail from './global/view/products_details';
import Layout from './global/view/pages_layout';
import ShopPage from './shop/view/shop_page';

const AppRouter = () => {
    return (
        <Routes >
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/shop' element={<ShopPage />}></Route>

            <Route path='/products/:productId' element={<ProductDetail />}></Route>


            <Route path="/*" element={<NoMatch />} />

        </Routes>
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




