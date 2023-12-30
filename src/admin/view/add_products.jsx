import { useEffect, useRef } from "react";
import ImagesGallery from "../widgets/image_gallery_selector";
import Product_Details from "../widgets/add_product_page_widgets/product_details";
import Product_Data from "../widgets/add_product_page_widgets/product_data";
import Product_Category from "../widgets/add_product_page_widgets/product_category";
import ProductImages from "../widgets/add_product_page_widgets/product_images";
import useProductImageStore from "../store/useProductImageStore";
import useDashboardFeaturesStore from "../store/useDashboardFeaturesStore";
import Loader from "../../global/widgets/loader";
import { useParams } from "react-router-dom";

const AddProductsPage = () => {
  const { toggleProductsGallery } = useProductImageStore((state) => ({
    toggleProductsGallery: state.toggleProductsGallery,
  }));
  const formRef = useRef();
  const {
    handlePublishingNewProduct,
    isLoading,
    handleSingleProductDetails,
    handleUpdatingProductData,
  } = useDashboardFeaturesStore((state) => ({
    handlePublishingNewProduct: state.handlePublishingNewProduct,
    isLoading: state.isLoading,
    handleSingleProductDetails: state.handleSingleProductDetails,
    handleUpdatingProductData: state.handleUpdatingProductData,
  }));
  const { productId } = useParams();

  useEffect(() => {
    if (location.pathname != "/admin/add-products") {
      handleSingleProductDetails(productId, true, formRef);
    }
  }, [handleSingleProductDetails, productId]);
  const handleConfirmButton = () => {
    const checkedInputs = Array.from(
      formRef.current.querySelectorAll('input[type="checkbox"]:checked'),
    );
    const checkedValues = checkedInputs.map((input) => input.value);
    return checkedValues;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (useProductImageStore.getState().selectedProductImageToAdd == null) {
      alert("make sure to add product image before submit");
    } else {
      const formData = new FormData(formRef.current);

      formData.append(
        "image",
        useProductImageStore.getState().selectedProductImageToAdd?._id || "",
      );
      formData.append("category", handleConfirmButton());

      if (productId) {
        await handleUpdatingProductData(formData, productId).then(() => {
          formRef.current.reset();
          useProductImageStore.setState({ selectedProductImageToAdd: null });
        });
      } else {
        await handlePublishingNewProduct(formData).then(() => {
          formRef.current.reset();
          useProductImageStore.setState({ selectedProductImageToAdd: null });
        });
      }
    }
  };

  return (
    <form
      autoComplete="off"
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative flex flex-col overflow-x-auto rounded-lg border-2 shadow-lg sm:m-1 sm:flex-row sm:p-8"
    >
      {isLoading && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-slate-100/40">
          <Loader />
        </div>
      )}
      <div className="input-field flex h-full flex-col justify-start sm:w-1/2">
        {/* Product Details */}
        <Product_Details />

        {/* Product Data */}
        <Product_Data />

        {/* product images gallery  */}
        {toggleProductsGallery && <ImagesGallery />}
      </div>

      {/* Product Category and Product Image Section */}
      <div className="flex flex-col justify-start gap-2  sm:ml-2  sm:w-1/2">
        <Product_Category />
        <ProductImages />
        <button
          type="submit"
          className="custome_grad w-fit place-self-center rounded-md p-1 text-white"
        >
          {productId ? "Update product" : " Publish product"}
        </button>
      </div>
    </form>
  );
};

export default AddProductsPage;
