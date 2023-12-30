import { useEffect, useRef } from "react";
import gsap from "gsap/gsap-core";
import useProductImageStore from "../store/useProductImageStore";

const ImagesGallery = () => {
  const {
    errorMessage,
    images,
    isLoading,
    selectedFile,
    handleFileSelect,
    handleImageUpload,
    uploadProgress,
    handleGettingImages,
    setSelectedProductImageToAdd,
    selectedProductImageToAdd,
    settoggleProductsGallery,
    handleConfirmSettingProductImage,
  } = useProductImageStore();

  const inputRef = useRef();
  const containerRef = useRef();
  const imageAltRef = useRef(null);

  //! fetch the images
  useEffect(() => {
    handleGettingImages();
  }, [handleGettingImages]);

  //!  on show animation

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.set(containerRef.current, {
      translateY: -100,
      opacity: 0,
    });
    timeline.to(containerRef.current, {
      translateY: 0,
      opacity: 1,
      duration: 0.5,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute  inset-0  z-10 h-fit  w-full rounded-lg bg-gray-100 p-4 sm:h-fit"
    >
      <>
        {isLoading ? (
          <center>Loading....</center>
        ) : (
          <>
            {/* title... */}
            <div className="mb-4">
              <span className="flex w-full items-center justify-between">
                <h1 className="mb-2 text-2xl font-bold">
                  Products Images Gallery
                </h1>

                <button
                  onClick={settoggleProductsGallery}
                  type="button"
                  className="h-fit rounded-md bg-white p-0.5 font-sans text-base ring-1 ring-rose-500  duration-200 ease-in-out hover:bg-red-400 hover:p-1 hover:text-white  hover:shadow-md hover:ring-0"
                >
                  Cancel
                </button>
              </span>
              <h2 className="mb-2 text-lg">Select existing image</h2>
            </div>

            {/* image gallery and show selected image on the right  */}
            <>
              {errorMessage ? (
                <center className="h-20 w-full rounded-md bg-slate-50 text-lg text-red-500">
                  {errorMessage}
                </center>
              ) : (
                <section className="mb-5 flex flex-row rounded-md  bg-white p-2 shadow-md">
                  {/* gallery */}
                  <div className="grid w-full grid-cols-2  gap-2  overflow-y-auto   p-3 max-sm:h-96 sm:h-[450px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  ">
                    {images.length == 0 ? (
                      <center className="col-span-3 place-self-center ">
                        No product images yet! upload some to use
                      </center>
                    ) : (
                      images.map((image) => (
                        <img
                          onClick={() => setSelectedProductImageToAdd(image)}
                          loading="lazy"
                          key={image._id}
                          className={`aspect-square  cursor-pointer  rounded-md object-scale-down hover:ring 
                          
                          ${
                            selectedProductImageToAdd &&
                            selectedProductImageToAdd._id === image._id
                              ? "ring ring-green-500 ring-offset-1"
                              : ""
                          }
                          
                          `}
                          src={image.thumbnailUrl}
                          alt={image.image_alt}
                        />
                      ))
                    )}

                    {selectedFile && (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        className="aspect-square  cursor-pointer  rounded-md object-scale-down ring ring-red-500 "
                      />
                    )}
                  </div>
                </section>
              )}
            </>

            <span className="flex flex-col justify-evenly gap-3 pt-5  sm:flex-row">
              {/* !upload new image button and confirm setting selected image */}
              <span className="flex w-full justify-around ">
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 max-sm:order-3 "
                  onClick={(el) => handleImageUpload(el, inputRef, imageAltRef)}
                >
                  {selectedFile ? "Submit" : "Upload New"}
                </button>

                {selectedProductImageToAdd && (
                  <button
                    className="rounded-md bg-white  p-1 ring-1 ring-green-400 duration-200 ease-in-out md:hover:bg-green-500 md:hover:text-white"
                    type="button"
                    onClick={handleConfirmSettingProductImage}
                  >
                    Set Image
                  </button>
                )}
              </span>

              {selectedFile && (
                // ! adding product image alt
                <>
                  <input
                    className="rounded-md placeholder:pl-2 max-sm:p-2"
                    type="text"
                    name="imageAlt"
                    placeholder="Image Alt"
                    ref={imageAltRef}
                  />
                </>
              )}
              {selectedFile && (
                //! image uploading progress...

                <div className="flex items-center gap-2">
                  <progress
                    className="w-full"
                    value={uploadProgress}
                    max="100"
                  ></progress>
                  <span>{uploadProgress}%</span>
                </div>
              )}
              {/* new image input  */}
              <input
                ref={inputRef}
                accept="image/jpeg, image/png, image/svg+xml, image/webp, image/heic, image/tiff, image/bmp"
                type="file"
                name="image"
                id="image"
                className="hidden"
                onChange={handleFileSelect}
              />
            </span>
          </>
        )}
      </>
    </div>
  );
};

export default ImagesGallery;
