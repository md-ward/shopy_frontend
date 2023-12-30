import { create } from "zustand";
import PropTypes from "prop-types";
import { getProductsImages, uploadImage } from "../controller/assetsController";

/**
 * @description This is a centralized state management store to handle all related states and function calls in the admin dashboard.
 */

const useProductImageStore = create((set) => ({
  images: [], //! Array of product images
  isLoading: true, //! Loading state
  selectedFile: null, //! Selected file for upload
  uploadProgress: 0, //! Upload progress percentage
  selectedProductImageToAdd: null, //! Selected product image to add
  errorMessage: null, //! Error message
  toggleProductsGallery: false, //! Toggle state for product images gallery
  confirmSettingProductImage: false, //! Confirmation state for setting product image

  /**
   * @brief Handles opening/closing the product images gallery.
   * @function settoggleProductsGallery
   */
  settoggleProductsGallery: () => {
    console.log(65456);
    set({
      toggleProductsGallery:
        !useProductImageStore.getState().toggleProductsGallery,
    });
  },

  /**
   * @brief Handles confirming the setting of a product image.
   * @function handleConfirmSettingProductImage
   */
  handleConfirmSettingProductImage: () => {
    set({
      confirmSettingProductImage: true,
    });
    useProductImageStore.getState().settoggleProductsGallery();
  },
  handleRemoveProductImage: () => {
    set({
      confirmSettingProductImage: false,
      selectedProductImageToAdd: null,
    });
  },

  /**
   * @brief Sets the selected product image to add.
   * @function setSelectedProductImageToAdd
   * @param {object} selectedProductImageToAdd - The selected product image to add.
   */
  setSelectedProductImageToAdd: (selectedProductImageToAdd) =>
    set({ selectedProductImageToAdd }),

  /**
   * @brief Retrieves the images thumbnails and updates the images (API handling).
   * @function handleGettingImages
   */
  handleGettingImages: async () => {
    set({ isLoading: true });
    try {
      const images = await getProductsImages();
      set({ images, isLoading: false, errorMessage: null });
    } catch (error) {
      set({ errorMessage: error, isLoading: false });
      console.warn("state: ", useProductImageStore.getState().errorMessage);
    }
  },

  /**
   * @brief Handles the selection of a file for upload.
   * @function handleFileSelect
   * @param {object} event - The file selection event.
   */
  handleFileSelect: (event) => {
    const file = event.target.files[0];
    set(() => ({
      selectedFile: file,
    }));
  },

  /**
   * @brief Handles uploading a new image to the gallery (API handling).
   * @function handleImageUpload
   * @param {object} event - The upload event.
   * @param {object} inputRef - The reference to the input element.
   * @param {object} imageAltRef - The reference to the image alt element.
   */
  handleImageUpload: async (event, inputRef, imageAltRef) => {
    event.preventDefault();
    const selectedFile = useProductImageStore.getState().selectedFile;
    if (selectedFile == null) {
      inputRef.current.click();
    } else {
      const formData = {
        image: selectedFile,
        imageAlt: imageAltRef.current.value,
      };

      const onUploadProgress = (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100,
        );
        set({ uploadProgress: progress });
      };

      try {
        const data = await uploadImage(formData, onUploadProgress);
        // console.warn("uploaded successfully: ", data);
        const updatedImages = useProductImageStore.getState().images;
        updatedImages.pop();
        updatedImages.push(data);

        set({ images: updatedImages, selectedFile: null, uploadProgress: 0 });
        imageAltRef.current.value = "";
      } catch (error) {
        console.error("something went wrong : ", error);
      }
    }
  },
}));

useProductImageStore.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image_alt: PropTypes.string.isRequired,
      originalUrl: PropTypes.string.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
      _id: PropTypes.object.isRequired,
      uploadedAt: PropTypes.any.isRequired,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectedFile: PropTypes.object,
  setImages: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
  handleFileSelect: PropTypes.func.isRequired,
  settoggleProductsGallery: PropTypes.func.isRequired,
  handleConfirmSettingProductImage: PropTypes.func.isRequired,
  setSelectedProductImageToAdd: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  toggleProductsGallery: PropTypes.bool.isRequired,
  confirmSettingProductImage: PropTypes.bool.isRequired,
  uploadProgress: PropTypes.number.isRequired,
  handleGettingImages: PropTypes.func.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
};
export default useProductImageStore;
