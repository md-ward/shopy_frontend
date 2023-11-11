import Layout from "../../global/view/pages_layout";
import FilterSection from "../widgets/filters";
import ProductSection from "../widgets/products_section";

const ShopPage = () => {
    const fetchedProducts = [
        {
            id: 1,
            name: 'Product 1',
            imageUrl: 'assets/Apple-iPhone-11-PNG-Image.png',
            description: 'Description of Product 1',
            price: 1000
            , rating: 4
        },
        {
            id: 2,
            name: 'Product 2',
            imageUrl: 'assets/Apple-iPhone-12-PNG-Transparent.png',
            description: 'Description of Product 2',
            price: 1200
            , rating: 2

        },
        {
            id: 3,
            name: 'Product 3',
            imageUrl: 'assets/Apple-iPhone-11-PNG-Image.png',
            description: 'Description of Product 3',
            price: 1500,
            rating: 5

        },
        {
            id: 4,
            name: 'Product 4',
            imageUrl: 'assets/Apple-iPhone-12-PNG-Transparent.png',
            description: 'Description of Product 4',
            price: 500,
            rating: 3

        },
        {
            id: 5,
            name: 'Product 5',
            imageUrl: 'assets/Apple-iPhone-11-PNG-Image.png',
            description: 'Description of Product 1',
            price: 1000
            , rating: 4
        },
        {
            id: 6,
            name: 'Product 2',
            imageUrl: 'assets/Apple-iPhone-12-PNG-Transparent.png',
            description: 'Description of Product 2',
            price: 1200
            , rating: 2

        },
        {
            id: 7,
            name: 'Product 3',
            imageUrl: 'assets/Apple-iPhone-11-PNG-Image.png',
            description: 'Description of Product 3',
            price: 1500,
            rating: 5

        },
        {
            id: 8,
            name: 'Product 4',
            imageUrl: 'assets/Apple-iPhone-12-PNG-Transparent.png',
            description: 'Description of Product 4',
            price: 500,
            rating: 3

        },

    ];

    return (
        <Layout>
            <div className="flex flex-col md:flex-row">
                <FilterSection />
                <ProductSection products={fetchedProducts} />
            </div>
        </Layout>
    );
};



export default ShopPage;