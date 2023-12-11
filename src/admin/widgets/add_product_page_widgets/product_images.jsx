import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProductImageStore from "../../store/useProductImageStore";

const ProductImages = () => {
  const {
    confirmSettingProductImage,
    selectedProductImageToAdd,
    toggleProductsGallery,
    settoggleProductsGallery,
  } = useProductImageStore();

  return (
    <section className="mt-2 rounded-md border max-sm:mx-2">
      <span className="flex w-full items-center justify-between bg-slate-50 p-1 px-3 text-lg font-semibold duration-300 ease-in-out">
        <h1 className="rounded-md bg-slate-50 p-2 text-center text-lg font-semibold">
          Product Image
        </h1>
        <FontAwesomeIcon
          icon={faAdd}
          onClick={settoggleProductsGallery}
          style={{ rotate: toggleProductsGallery ? "45deg" : "90deg" }}
          className={`aspect-square cursor-pointer rounded-full p-1 sm:duration-300 sm:ease-in-out ${
            toggleProductsGallery
              ? "sm:ring sm:ring-rose-400 sm:hover:bg-slate-200 sm:hover:text-rose-500"
              : "sm:hover:bg-slate-200 sm:hover:ring sm:hover:ring-gray-400"
          }`}
          size="lg"
        />
      </span>

      <div className="flex aspect-video w-full content-center justify-center p-2">
        {selectedProductImageToAdd && confirmSettingProductImage && (
          <img
            src={selectedProductImageToAdd.originalUrl}
            alt={selectedProductImageToAdd.imageAlt}
          />
        )}
      </div>
    </section>
  );
};

export default ProductImages;
