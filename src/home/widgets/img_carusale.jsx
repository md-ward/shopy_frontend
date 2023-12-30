import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import PropTypes from "prop-types";
import img1 from "/assets/ads/ads1.png";
import img2 from "/assets/ads/ads2.png";
import img3 from "/assets/ads/ads3.png";
import img4 from "/assets/ads/ads4.png";

const CarouselDots = ({ images, activeIndex, handleClick }) => {
  return (
    <div className="absolute bottom-2 mt-4 flex w-full justify-center">
      {images.map((_, index) => (
        <button
          key={index}
          className={`mx-1 h-3 w-3 rounded-full ${
            index === activeIndex ? "bg-black" : "bg-gray-300"
          }`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

CarouselDots.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const ImgCarousel = () => {
  const images = [img1, img2, img3, img4];
  const [changeImg, setChangeImg] = useState(0);
  const imageRef = useRef(null);
  const intervalRef = useRef(null);

  function handleChangeImg(arrow_direction) {
    const tl = gsap.timeline();
    tl.to(imageRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        switch (arrow_direction) {
          case "left":
            setChangeImg((changeImg - 1 + images.length) % images.length);
            break;
          case "right":
            setChangeImg((changeImg + 1) % images.length);
            break;
          default:
            break;
        }
        tl.to(imageRef.current, { opacity: 1, duration: 0.3 });
      },
    });
  }

  function handleDotClick(index) {
    setChangeImg(index);
  }

  useLayoutEffect(() => {
    intervalRef.current = setInterval(() => {
      handleChangeImg("right");
    }, 4000);

    return () => {
      clearInterval(intervalRef.current);
    };
  });

  return (
    <div className="flex justify-center py-4">
      <span className="relative flex items-center">
        <img
          ref={imageRef}
          src={images[changeImg]}
          alt=""
          className="rounded-lg"
        />

        {/* left arrow */}
        <button className="absolute" onClick={() => handleChangeImg("left")}>
          <img
            src="assets/arrow-up.svg"
            alt="arrow left"
            className="h-6  -rotate-90  sm:h-12"
          />
        </button>

        {/* right arrow */}
        <button
          className="absolute right-0"
          onClick={() => handleChangeImg("right")}
        >
          <img
            src="assets/arrow-up.svg"
            alt="arrow right"
            className="h-6 rotate-90 sm:h-12 "
          />
        </button>

        <CarouselDots
          images={images}
          activeIndex={changeImg}
          handleClick={handleDotClick}
        />
      </span>
    </div>
  );
};

ImgCarousel.propTypes = {};

export default ImgCarousel;
