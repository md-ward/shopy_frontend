import Navbar from '../widgets/nav_bar';
import Footer from '../widgets/footer';


// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {

    return (


        <>

            <Navbar />

            <div className='lg:min-h-screen' >
                {children}
            </div>


            <Footer />


        </>

    );
}

export default Layout;