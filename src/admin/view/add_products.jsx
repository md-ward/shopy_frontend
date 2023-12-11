import { useRef } from "react";
import ImagesGallery from "../widgets/image_gallery_selector";

import Product_Details from "../widgets/add_product_page_widgets/product_details";
import Product_Data from "../widgets/add_product_page_widgets/product_data";
import Product_Category from "../widgets/add_product_page_widgets/product_category";
import ProductImages from "../widgets/add_product_page_widgets/product_images";
import useProductImageStore from "../store/useProductImageStore";

const AddProductsPage = () => {
  //! to open / close the product image gallery...
  const { toggleProductsGallery } = useProductImageStore();
  const formRef = useRef();
  return (
    <div className="relative flex  w-full flex-col rounded-lg border-2 shadow-lg   sm:m-1 sm:flex-row   sm:p-8">
      <div className="input-field  h-full   sm:w-1/2">
        <form ref={formRef}>
          {/* Product Details */}
          <Product_Details />

          {/* Product Data */}
          <Product_Data />
          {/* product images gallery  */}
          {toggleProductsGallery && <ImagesGallery />}
        </form>
      </div>

      {/* Product Category and Product Image Section */}
      <div className="sm:ml-2 sm:w-1/2">
        <Product_Category />

        <ProductImages />
      </div>
    </div>
  );
};
export default AddProductsPage;
