import { useParams } from 'react-router-dom';
import Layout from './pages_layout';

const ProductDetail = () => {
    const { productId } = useParams();

    // Fetch product details based on the productId from an API or other data source

    const product = {
        id: productId,
        name: 'Product Name',
        price: 29.99,
        description: 'Product description goes here.',
    };

    const handleAddToCart = () => {
        // Logic to add the product to the cart
    };

    return (

        <Layout>

            <div className=''>
                <h1>Product Detail</h1>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>


        </Layout>

    );
};

export default ProductDetail;