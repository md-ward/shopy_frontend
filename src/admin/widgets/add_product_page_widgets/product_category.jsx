import gsap from "gsap/gsap-core";
import React, { useState, useRef, useEffect } from "react";
import useDashboardFeaturesStore from "../../store/useDashboardFeaturesStore";

const Product_Category = () => {
  const [newCategory, setnewCategory] = useState(false);
  const newCategoryRef = useRef();
  const { categories, handleGettingCategories, handleAddingNewCategory } =
    useDashboardFeaturesStore((state) => ({
      categories: state.categories,
      handleGettingCategories: state.handleGettingCategories,
      handleAddingNewCategory: state.handleAddingNewCategory,
    }));
  useEffect(() => {
    handleGettingCategories();
  }, [handleGettingCategories]);

  //! new Category bar toggle with animation
  function handleNewCategoryFeildAnimation() {
    const searchInput = newCategoryRef.current;

    if (!newCategory) {
      setnewCategory(!newCategory);

      gsap.fromTo(
        searchInput,
        { width: 0, opacity: 0 },
        {
          width: "200px",
          opacity: 1,
          duration: 0.3,
          ease: "power3",
        },
      );
    } else {
      gsap.fromTo(
        searchInput,
        { width: "200px", opacity: 1 },
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
        newCategoryRef.current.value = "";

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
      btn_action: async () => {
        handleAddingNewCategory(newCategoryRef.current.value).then(() => {
          newCategoryRef.current.value = "";
          setnewCategory(false);
        });
      },
      icon_src: "/assets/check.svg",
      alt: "confirm ",
      className:
        " text-white rounded-full sm:hover:p-1 aspect-square h-full sm:hover:bg-green-200 sm:hover:ring-green-400 sm:hover:ring-2   sm:duration-300 sm:ease-in-out ",
    },
  ];

  return (
    <div className="   rounded-md  border max-sm:mx-2">
      <span className=" flex w-full items-center justify-between bg-slate-50  p-1 px-3  text-lg font-semibold  duration-300 ease-in-out">
        {!newCategory && <p className="p-2">Category</p>}
        {/* search bar  */}
        <input
          type="text"
          ref={newCategoryRef}
          name="new_category"
          className={` rounded-lg   pl-2 outline-none ring-indigo-600  focus:ring-1 ${
            newCategory ? "block" : "hidden"
          }`}
        />
        {CategoryButtns.map((button, index) => (
          <React.Fragment key={index}>
            {button.isActive && (
              <button
                type="button"
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
      <div className="overflow-y-auto p-2">
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <span className=" flex flex-row  items-center">
              <input type="checkbox" value={category.category} />
              <label className="ml-2">{category.category}</label>
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Product_Category;
