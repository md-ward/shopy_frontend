import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import Loader from "./loader";
import { useNavigate } from "react-router-dom";
import useShopStore from "../../shop/store/useShopStore";

const SearchResultsCard = ({
  searchResults,
  isLoading,
  error,
  searchAnimation,
}) => {
  const navigate = useNavigate();

  const handleNavToProductPage = (id) => {
    searchAnimation();
    navigate(`/shop/${id}`);
  };

  return (
    <div className="custome_grad   custom-scrollbar scrllbar absolute top-11 z-40   h-fit max-h-96 max-w-80 space-y-1 divide-y overflow-y-auto rounded-md p-2 text-black delay-500 duration-300 ease-in-out group-focus-within:block group-hover:scale-100">
      {isLoading && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}

      {searchResults?.length === 0 || error ? (
        <h1 className="rounded-md bg-white px-2">No results found {error}</h1>
      ) : (
        searchResults?.map((item) => (
          <div
            onClick={() => handleNavToProductPage(item._id)}
            key={item._id}
            className="grid cursor-pointer   grid-cols-3 rounded-md bg-white ring-indigo-700 hover:ring"
          >
            <img
              className="w-full rounded-md object-scale-down "
              src={item.image.thumbnailUrl}
              alt={item.product_name}
            />
            <div className="col-span-2 px-6 py-4">
              <div className="mb-2 font-bold">{item.product_name}</div>
              <p className="text-base text-gray-700">Price: {item.price}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const SearchBar = ({ setToggleSearch }) => {
  const searchRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      searchRef.current,
      { width: 0, opacity: 0 },
      {
        width: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power3",
      },
    );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = searchRef.current.value;

    if (searchTerm.trim() === "") {
      return;
    }

    handleSearchForProducts(searchTerm);
  };

  const {
    handleSearchForProducts,
    searchResults,
    resetSearch,
    isLoading,
    error,
  } = useShopStore((state) => ({
    handleSearchForProducts: state.handleSearchForProducts,
    searchResults: state.searchResults,
    resetSearch: state.resetSearch,
    isLoading: state.isLoading,
    error: state.error,
  }));

  const searchAnimation = () => {
    const searchInput = searchRef.current;

    gsap.fromTo(
      searchInput,
      { width: "auto", opacity: 1 },
      {
        width: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3",
        onComplete: () => {
          setToggleSearch(false);
          resetSearch();
        },
      },
    );
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        searchAnimation();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      ref={containerRef}
      className="group relative z-10 flex w-full items-center justify-center gap-2 text-white ring-indigo-900"
      onSubmit={handleSearch}
    >
      <FontAwesomeIcon
        icon={faClose}
        className="cursor-pointer"
        onClick={searchAnimation}
      />
      <input
        role="form"
        ref={searchRef}
        placeholder="product name or category"
        autoComplete="off"
        type="search"
        name="search"
        className="rounded-lg bg-slate-50 px-3 text-black outline-none ring-indigo-600 invalid:ring-red-600 focus:ring"
      />
      <button type="submit">Search</button>
      <SearchResultsCard
        searchAnimation={searchAnimation}
        error={error}
        isLoading={isLoading}
        searchResults={searchResults}
      />
    </form>
  );
};

SearchResultsCard.propTypes = {
  searchResults: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  searchAnimation: PropTypes.func,
};

SearchBar.propTypes = {
  setToggleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
