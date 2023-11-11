import PropTypes from 'prop-types';
import ProductCard from './product_card';

const ProductSection = ({ products }) => {
  return (
    <section className="w-full grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4">
      {products.map((product, index) => (
        <ProductCard product={product} key={index} />
      ))}
    </section>
  );
};

ProductSection.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductSection;