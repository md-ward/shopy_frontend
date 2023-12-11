import gsap from "gsap/gsap-core";
import React, { useState, useRef } from "react";

const Product_Category = () => {
  const [newCategory, setnewCategory] = useState(false);
  const newCategoryRef = useRef();

  //! new Category bar toggle with animation
  function handleNewCategoryFeildAnimation() {
    const searchInput = newCategoryRef.current;

    if (!newCategory) {
      setnewCategory(!newCategory);

      gsap.fromTo(
        searchInput,
        { width: 0, opacity: 0 },
        {
          width: "300px",
          opacity: 1,
          duration: 0.3,
          ease: "power3",
        },
      );
    } else {
      gsap.fromTo(
        searchInput,
        { width: "300px", opacity: 1 },
        {
          width: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3",
          onComplete: () => {
            setnewCategory(!newCategory);
          },
        },
      );
    }
  }

  const CategoryButtns = [
    {
      isActive: !newCategory,
      title: "add new product",
      btn_action: () => {
        handleNewCategoryFeildAnimation();
      },
      icon_src: "/assets/add.svg",
      alt: "add new product",
      className:
        " text-white rounded-md p-0.5    sm:hover:bg-slate-200 sm:hover:ring sm:hover:ring-gray-400  sm:duration-300 sm:ease-in-out ",
    },
    {
      isActive: newCategory,
      title: "cancle",
      btn_action: () => {
        handleNewCategoryFeildAnimation();
      },
      icon_src: "/assets/close.svg",
      alt: "cancle",
      className:
        " text-white rounded-full sm:hover:p-1  aspect-square h-full   sm:hover:bg-red-200 sm:hover:ring-red-400 sm:hover:ring-2  sm:duration-300 sm:ease-in-out ",
    },
    {
      isActive: newCategory,
      title: "confirm",
      btn_action: () => {},
      icon_src: "/assets/check.svg",
      alt: "confirm ",
      className:
        " text-white rounded-full sm:hover:p-1 aspect-square h-full sm:hover:bg-green-200 sm:hover:ring-green-400 sm:hover:ring-2   sm:duration-300 sm:ease-in-out ",
    },
  ];

  return (
    <div className="mt-2    rounded-md  border max-sm:mx-2">
      <span className=" flex w-full items-center justify-between bg-slate-50  p-1 px-3  text-lg font-semibold  duration-300 ease-in-out">
        <p className="p-2">Category</p>

        {/* search bar  */}
        <input
          type="text"
          ref={newCategoryRef}
          name="new_category"
          className={`  rounded-lg outline-none ring-indigo-600  focus:ring-1 ${
            newCategory ? "block" : "hidden"
          }`}
        />
        {CategoryButtns.map((button, index) => (
          <React.Fragment key={index}>
            {button.isActive && (
              <button
                className={button.className}
                onClick={button.btn_action}
                title={button.title}
              >
                <img src={button.icon_src} alt={button.alt} className="h-7" />
              </button>
            )}
          </React.Fragment>
        ))}
      </span>
      <div className="p-2">
        <input type="checkbox" id="cat1" />
        <label htmlFor="cat1" className="ml-2">
          TV
        </label>
      </div>
      <div className="p-2">
        <input type="checkbox" id="cat2" />
        <label htmlFor="cat2" className="ml-2">
          Mobile
        </label>
      </div>
      <div className="p-2">
        <input type="checkbox" id="cat3" />
        <label htmlFor="cat3" className="ml-2">
          Laptop
        </label>
      </div>
    </div>
  );
};

export default Product_Category;
