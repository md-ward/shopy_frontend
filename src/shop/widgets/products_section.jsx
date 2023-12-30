import ProductCard from "./product_card";
import { useEffect } from "react";
import useDashboardFeaturesStore from "../../admin/store/useDashboardFeaturesStore";
import useShopStore from "../store/useShopStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ProductSection = () => {
  const { products, handleGettingProducts } = useDashboardFeaturesStore(
    (state) => ({
      products: state.products,
      handleGettingProducts: state.handleGettingProducts,
    }),
  );
  const { filteredProducts } = useShopStore((state) => ({
    filteredProducts: state.filteredProducts,
  }));

  useEffect(() => {
    handleGettingProducts();
  }, [handleGettingProducts]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-8 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {filteredProducts.length > 0
          ? filteredProducts.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))
          : products.products?.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
      </div>

      <nav
        className="isolate flex w-full  gap-2 cursor-pointer  items-center justify-center -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <FontAwesomeIcon
          className="relative inline-flex h-5 w-5 items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          icon={faChevronLeft}
        />

        {Array.from({ length: products.pages }, (_, index) => (
          <span
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            key={index}
          >
            {index + 1}
          </span>
        ))}
        <FontAwesomeIcon
          className="relative inline-flex h-5 w-5 items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          icon={faChevronRight}
        />
      </nav>
    </>
  );
};

export default ProductSection;
