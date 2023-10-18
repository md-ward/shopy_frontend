import Navbar from '../widgets/nav_bar'
const Layout = ({ children }) => {

    return (


        <>

            <Navbar />
            <div className="flex flex-row w-full justify-evenly p-2 font-serif text-white max-w-6xl  "
            >

                {children}


            </div>



        </>

    );
}

export default Layout;