import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    // Simulating an API call to fetch the featured products
    useEffect(() => {
        // Replace this with your actual API call to fetch the featured products
        setTimeout(() => {
            const fetchedProducts = [
                {
                    id: 1,
                    name: 'Product 1',
                    imageUrl: 'assets/Apple-iPhone-11-PNG-Image.png',
                    description: 'Description of Product 1',
                    price: 1000
                },
                {
                    id: 2,
                    name: 'Product 2',
                    imageUrl: 'assets/Apple-iPhone-12-PNG-Transparent.png',
                    description: 'Description of Product 2',
                    price: 1200

                },
                {
                    id: 3,
                    name: 'Product 3',
                    imageUrl: 'assets/Apple-iPhone-11-PNG-Image.png',
                    description: 'Description of Product 3',
                    price: 1500

                },
                {
                    id: 4,
                    name: 'Product 4',
                    imageUrl: 'assets/Apple-iPhone-12-PNG-Transparent.png',
                    description: 'Description of Product 4',
                    price: 500

                },
            ];
            setProducts(fetchedProducts);
        }, 1000); // Simulating a 2-second delay
    }, []);

    return (
        <section className='p-2 mx-2'>
            <h2 className='py-4 pl-4 font-bold text-xl'>Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <div className="bg-white rounded-lg shadow-md p-4 hover:scale-105 duration-200 ease-in-out transition-all">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-contain mb-4" />
                            <span className='flex justify-around'>
                                <h3 className="text-lg font-medium">{product.name}</h3>
                                <p className="text-gray-500">{product.price} $</p>
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;