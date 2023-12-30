import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProductImageStore from "../../store/useProductImageStore";

const ProductImages = () => {
  const {
    confirmSettingProductImage,
    handleRemoveProductImage,
    selectedProductImageToAdd,

    settoggleProductsGallery,
  } = useProductImageStore((state) => ({
    confirmSettingProductImage: state.confirmSettingProductImage,
    handleRemoveProductImage: state.handleRemoveProductImage,
    selectedProductImageToAdd: state.selectedProductImageToAdd,
    settoggleProductsGallery: state.settoggleProductsGallery,
  }));

  return (
    <section className="mt-2  rounded-md  border max-sm:mx-2">
      <span className="  flex  w-full items-center justify-between bg-slate-50  p-1 px-3 text-lg font-semibold duration-300 ease-in-out">
        <h1 className=" rounded-md bg-slate-50 p-2 text-center text-lg font-semibold">
          Product Image
        </h1>
        <FontAwesomeIcon
          icon={faAdd}
          //! change the state of the image gallery
          onClick={settoggleProductsGallery}
          className="  aspect-square cursor-pointer rounded-full   p-1  duration-200 ease-in-out  sm:hover:bg-slate-200  sm:hover:p-1.5 sm:hover:ring sm:hover:ring-gray-400   "
          size="lg"
        />
      </span>
      <div className="flex flex-col items-center p-2">
        {selectedProductImageToAdd && confirmSettingProductImage && (
          <div className="max-w-lg">
            <img
              src={selectedProductImageToAdd.originalUrl}
              alt={selectedProductImageToAdd.imageAlt}
              className="w-full"
            />
            <button
              onClick={handleRemoveProductImage}
              type="button"
              className="text-sm text-red-500 underline"
            >
              Remove image <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductImages;
