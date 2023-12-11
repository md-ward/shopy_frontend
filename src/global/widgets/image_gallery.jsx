import { useRef, useState } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";

const ImageGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [initialize, setinitialize] = useState(true);
  const imageRef = useRef();
  const imageBoxRefs = useRef([]);
  const blueBoxRef = useRef();

  const handleImageClick = (index) => {
    //? to make sure the blue box visible on first render
    if (initialize) {
      setinitialize(false);
    }

    //! play animation of the blue box

    const tl = gsap.timeline();

    const blueBox = blueBoxRef.current;
    const imageBox = imageBoxRefs.current[index];

    tl.to(blueBox, {
      left: imageBox.offsetLeft,
      top: imageBox.offsetTop,
      width: imageBox.offsetWidth,
      height: imageBox.offsetHeight,
      duration: 0.2,
      ease: "power2.out",
    })

      .set(imageRef.current, { src: images[index] })
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          skewX: 0,
          duration: 0.2,
          ease: "power2.out",
        },
      )
      .set(imageBoxRefs.current[currentImage], { opacity: 1, scale: 1 });

    setCurrentImage(index);
  };

  return (
    <div className="flex flex-col items-center">
      <img
        ref={imageRef}
        src={images[currentImage]}
        alt={`Product ${currentImage + 1}`}
        className="mb-4 h-auto w-full max-w-lg rounded-lg shadow-md"
      />
      <div className="relative">
        {/* the blue box arround the small images in the gallery */}
        <div
          ref={blueBoxRef}
          className="absolute  rounded-md border-4 border-indigo-500"
          style={{
            display: initialize ? "none" : "block",

            left: 0,
            top: 0,
            width: 0,
            height: 0,
            transition: "left 0.2s, top 0.2s, width 0.2s, height 0.2s",
          }}
        ></div>
        <div className="grid grid-cols-5 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              className={`cursor-pointer ${
                index === currentImage ? "opacity-100 " : "opacity-50"
              }
                                ${
                                  initialize && index == currentImage
                                    ? " rounded-md  border-4 border-indigo-500"
                                    : ""
                                }
                                
                                
                                `}
              onClick={() => handleImageClick(index)}
              ref={(el) => (imageBoxRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageGallery;
