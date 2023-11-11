import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RatingComponent from './rating_stars';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/products/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md p-4 m-4 hover:scale-105 duration-200 ease-in-out transition-all">
                <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-contain mb-4" />
                <span className="flex justify-around">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <p className="text-gray-500">{product.price} $</p>
                </span>
                <RatingComponent className={'flex p-2 justify-center select-none'} rate={product.rating} readOnly={true}

                    starSize={28}

                />
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        rating: PropTypes.number,


    }).isRequired,
};

export default ProductCard;