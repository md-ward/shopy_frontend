import FeaturedProducts from "../widgets/featured_products";
import ImgCarusale from "../widgets/img_carusale";

const HomePage = () => {
  return (
    <div className="  bg-gray-50 bg-opacity-40">
      <ImgCarusale />
      <br />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
