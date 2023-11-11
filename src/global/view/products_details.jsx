import { useParams } from 'react-router-dom';
import Layout from './pages_layout';
import RatingComponent from '../../shop/widgets/rating_stars';
import ImageGallery from '../widgets/image_gallery';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useTranslationStore from '../state/useTranslationStore';

const ProductDetail = () => {
    const { currentLanguage, t } = useTranslationStore();

    const productDetailPageref = useRef();
    // stagger effect on first time page loaded 
    useEffect(() => {
        gsap.fromTo(
            productDetailPageref.current.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2 }
        );
    }, []);


    // product id from url
    const { productId } = useParams();

    const product = {
        id: productId,
        name: 'iPhone 12',
        price: 999.99,
        description: 'The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.The iPhone 12 is a powerful and stylish smartphone with advanced features.',
        rating: 4,
        images: [
            '/assets/Apple-iPhone-11-PNG-Image.png',
            '/assets/Apple-iPhone-12-PNG-Transparent.png',
            '/assets/Apple-iPhone-11-PNG-Image.png',
            '/assets/Apple-iPhone-12-PNG-Transparent.png',
            '/assets/Apple-iPhone-11-PNG-Image.png',
        ],
        comments: [
            {
                id: 1,
                user: 'John',
                comment: 'Great phone, excellent camera quality.',
            },
            {
                id: 2,
                user: 'Sarah',
                comment: 'The battery life could be better.',
            },
            {
                id: 3,
                user: 'Michael',
                comment: 'Fast performance and beautiful design.',
            },
            {
                id: 1,
                user: 'John',
                comment: 'Great phone, excellent camera quality.',
            },
            {
                id: 2,
                user: 'Sarah',
                comment: 'The battery life could be better.',
            },
            {
                id: 3,
                user: 'Michael',
                comment: 'Fast performance and beautiful design.',
            },
            {
                id: 1,
                user: 'John',
                comment: 'Great phone, excellent camera quality.',
            },
            {
                id: 2,
                user: 'Sarah',
                comment: 'The battery life could be better.',
            },
            {
                id: 3,
                user: 'Michael',
                comment: 'Fast performance and beautiful design.',
            },
        ],
    };

    const handleAddToCart = () => {
        // Logic to add the product to the cart
    };

    return (
        <Layout>
            <div
                dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
                ref={productDetailPageref}
                className="bg-white min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 py-8 border border-gray-300 shadow-md rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-4 text-indigo-900">{t('productDetails')}</h1>
                            <div className="bg-gray-50 shadow-sm rounded-md p-4">
                                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                                <p className="mb-4">{product.description}</p>
                                <p className="font-bold">Price: ${product.price}</p>
                                <div className="font-bold">
                                    Rating: <RatingComponent className="flex" readOnly rate={product.rating} />
                                </div>
                            </div>

                            <section className='max-h-96 overflow-y-scroll custom-scrollbar mt-2'>
                                <h3 className="text-xl text-indigo-900 font-bold mt-8 mb-4">{t('comments')}</h3>
                                {product.comments.map((comment) => (
                                    <div key={comment.id} className="mb-4 border-b pb-4">
                                        <p className="font-bold text-indigo-500">{comment.user}</p>
                                        <p>{comment.comment}</p>
                                    </div>
                                ))}
                            </section>
                            <button
                                onClick={handleAddToCart}
                                className="shadow-md hover:shadow-inner text-white font-bold py-2 px-4 rounded mt-8 bg-indigo-500 hover:bg-indigo-600"
                            >
                                {t('addToCart')}
                            </button>
                        </div>
                        <ImageGallery images={product.images} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetail;