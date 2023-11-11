import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTranslationStore from '../../global/state/useTranslationStore';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const { t, currentLanguage } = useTranslationStore();

    // Simulating an API call to fetch the featured products
    useEffect(() => {
        // Replace this with your actual API call to fetch the featured products
        const fetchedProducts = [
            {
                id: 1,
                name: 'Product 1',
                imageUrl: 'assets/Apple-iPhone-11-PNG-Image.png',
                description: 'Description of Product 1',
                price: 1000
                ,
                rate: 4
            },
            {
                id: 2,
                name: 'Product 2',
                imageUrl: 'assets/Apple-iPhone-12-PNG-Transparent.png',
                description: 'Description of Product 2',
                price: 1200,
                rate: 5

            },
            {
                id: 3,
                name: 'Product 3',
                imageUrl: 'assets/Apple-iPhone-11-PNG-Image.png',
                description: 'Description of Product 3',
                price: 1500,
                rate: 3

            },
            {
                id: 4,
                name: 'Product 4',
                imageUrl: 'assets/Apple-iPhone-12-PNG-Transparent.png',
                description: 'Description of Product 4',
                price: 500
                , rate: 5

            },
        ];
        setProducts(fetchedProducts);
    }, []);

    return (
        <section className='p-2 mx-2 ' dir={currentLanguage == 'ar' ? 'rtl' : 'ltr'}>
            <h2 className='py-4 pl-4 font-bold text-xl'>{t('featured')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <div className="bg-white rounded-lg shadow-md p-4 hover:scale-105 duration-200 ease-in-out transition-all">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-contain mb-4" />
                            <span className='flex  flex-col justify-center  items-center'>
                                <h3 className="text-base font-medium">{product.name}</h3>
                                <p className="text-indigo-500">{product.price} $</p>
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;