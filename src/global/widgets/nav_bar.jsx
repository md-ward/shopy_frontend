import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useTranslationStore from "../state/useTranslationStore";
import useRegistering from "../../user_registering/store/useRegisteringStore";
import useCartStore from "../../cart/store/useCartStore";
import CartTooltip from "./cart_tooltip";
import SearchBar from "./searchResults";
import FilterSection from "../../shop/widgets/filters";

const Navbar = () => {
  //? global State
  const { t, setCurrentLanguage, currentLanguage } = useTranslationStore(
    (state) => ({
      t: state.t,
      setCurrentLanguage: state.setCurrentLanguage,
      currentLanguage: state.currentLanguage,
    }),
  );
  const { toggleDialog, isLogedIn } = useRegistering((state) => ({
    toggleDialog: state.toggleDialog,
    isLogedIn: state.isLogedIn,
  }));

  // ! local State
  const [expand, setExpand] = useState(true);
  const [toggleSearch, setToggleSearch] = useState(false);
  // ! Element Refrence:

  const navLinksRef = useRef();
  const iconButtonsRef = useRef();
  const navigate = useNavigate();

  //? nav items
  const headerItems = [
    { title: "home", to: "/" },
    { title: "shop", to: "/shop" },
    { title: "about", to: "/about" },
    { title: "contact", to: "/contact" },
  ];

  function handleUserIconButton() {
    if (isLogedIn) {
      navigate("/user_logs");
    } else {
      toggleDialog();
    }
  }
  // * nav icon buttons
  const iconButtons = [
    {
      id: "cart",
      src: "/assets/cart.svg",
      alt: "shopping cart",
      fun: () => {
        navigate("/cart");
      },
    },
    { src: "/assets/user.svg", alt: "user ", fun: handleUserIconButton },
    {
      src: "/assets/search.svg",
      alt: "search ",
      fun: () => setToggleSearch(true),
    },
  ];

  // ! mobeile ui nav  animation ...
  function playAnimation() {
    if (expand) {
      gsap
        .timeline()
        .to(navLinksRef.current, { opacity: 0, duration: 0.3, ease: "power3" })
        .add(() => {
          navLinksRef.current.classList.add("hidden");
          iconButtonsRef.current.classList.remove("max-sm:hidden");
        })
        .to(iconButtonsRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power3",
        });
    } else {
      gsap
        .timeline()
        .to(iconButtonsRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power3",
        })
        .add(() => {
          navLinksRef.current.classList.remove("hidden");
          iconButtonsRef.current.classList.add("max-sm:hidden");
        })
        .to(navLinksRef.current, { opacity: 1, duration: 0.3, ease: "power3" });
    }
  }

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650) {
        navLinksRef.current.style.opacity = 1;
        iconButtonsRef.current.style.opacity = 1;
        navLinksRef.current.classList.remove("hidden");
        iconButtonsRef.current.classList.add("max-sm:hidden");
        setExpand(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  useEffect(() => {
    const unsubscribe = useCartStore.subscribe((state, prev) => {
      if (state.cart !== prev.cart) {
        gsap.fromTo(
          "#cart",
          { opacity: 0, scale: 0, backgroundColor: "white" },
          {
            backgroundColor: "red",
            opacity: 1,
            scale: 1,
            duration: 0.5,
          },
        );
      }
    });
    return unsubscribe;
  }, []);

  return (
    <nav className="custome_grad  flex   justify-evenly py-2">
      {/* Logo */}
      <div
        onClick={() => {
          navigate("/", { replace: true });
        }}
        className="  hidden cursor-pointer select-none items-center pl-8 font-[AttackGraf] md:flex  md:w-1/3"
      >
        <h1 className="text-3xl font-bold text-white">Yas Shop</h1>
      </div>

      {/* Navigation Items */}
      <ul
        ref={navLinksRef}
        className=" flex    w-full flex-row items-center justify-evenly font-[Pacifico]  md:w-1/2 "
      >
        {headerItems.map((item, index) => (
          <li
            key={index}
            className="group relative cursor-pointer text-white transition-colors duration-200 hover:text-gray-200"
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "decoration-white   underline-offset-2  hover:no-underline md:underline"
                  : ""
              }
              to={item.to}
            >
              {t(item.title)}
            </NavLink>
            <span className="ease-in-outtransition-all absolute -bottom-1 left-0 h-0.5 w-0 bg-white opacity-0 duration-300 group-hover:w-full group-hover:opacity-100"></span>
          </li>
        ))}
      </ul>

      {/* Icon Buttons */}
      <section
        ref={iconButtonsRef}
        className=" flex w-full flex-row items-center justify-evenly  max-sm:hidden md:w-1/3 "
      >
        {/* search bar  */}

        {toggleSearch && (
          <SearchBar
            toggleSearch={toggleSearch}
            setToggleSearch={setToggleSearch}
          />
        )}

        {/* filter for shopping page */}
        {location.pathname == "/shop" && <FilterSection />}
        {/* icon buttons */}
        {!toggleSearch &&
          iconButtons.map((icon, index) => (
            <div className="group  relative z-10 flex" key={index}>
              <>
                <img
                  title={icon?.id == "cart" ? "" : icon.alt}
                  onClick={icon.fun}
                  src={icon.src}
                  alt={icon.alt}
                  className=" h-6 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 sm:h-6"
                />
                {icon.id == "cart" && (
                  <>
                    <span
                      id="cart"
                      className="absolute    -left-1 -z-10 aspect-square  w-3 rounded-full bg-red-600"
                    ></span>
                    <CartTooltip />
                  </>
                )}
              </>
            </div>
          ))}
        {/* change site language  */}
        {!toggleSearch && (
          <select
            className="bg-transparent font-sans text-white"
            onChange={(e) => handleLanguageChange(e.target.value)}
            value={currentLanguage}
          >
            <option value="en" className="text-black">
              {t("en")}
            </option>
            <option value="ar" className="text-black">
              {t("ar")}
            </option>
            <option value="fr" className="text-black">
              {t("fr")}
            </option>
          </select>
        )}
      </section>

      {/* Arrow Icon */}
      <div
        className={` flex items-center justify-center sm:hidden ${expand ? "rotate-180" : "rotate-0"
          } transition-all duration-150 ease-in-out`}
        onClick={() => {
          setExpand(!expand);
          playAnimation();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
