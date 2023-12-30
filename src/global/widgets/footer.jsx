import { Link } from "react-router-dom";
import useTranslationStore from "../state/useTranslationStore";

const Footer = () => {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com",
      img: "/assets/facebook.svg",
    },
    { name: "Twitter", url: "https://www.twitter.com", img: "/assets/x.svg" },
    {
      name: "Instagram",
      url: "https://www.instagram.com",
      img: "/assets/instagram.svg",
    },
  ];

  const { t, currentLanguage } = useTranslationStore();
  const navLinks = [
    { path: "/", label: "home" },
    { path: "/shop", label: "shop" },
    { path: "/about", label: "about" },
    { path: "/contact", label: "contact" },
  ];

  return (
    <footer
      className="custome_grad select-none py-6 text-white"
      dir={currentLanguage == "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto    flex   flex-col  justify-evenly  px-4  sm:flex-row   max-sm:[&_div]:items-start">
        {/* contact us section */}
        <div className="mb-6 flex  w-full select-text flex-col  place-content-between ">
          <h3 className=" mb-4 select-none text-lg font-semibold">
            {t("contact")}
          </h3>
          <p>123 Main Street, City, Country</p>
          <p>info@example.com</p>
          <p>+1 234 567 890</p>
        </div>
        {/* nav links section */}
        <div className="mb-6 flex  w-full   flex-col items-center ">
          <h3 className="mb-4 text-lg font-semibold">{t("quick_links")}</h3>
          <ul>
            {navLinks.map((link, index) => (
              <li key={index} className="group relative mb-2 w-fit">
                <span className="absolute -top-1 right-0 h-0.5 w-0 bg-white   opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:opacity-100"></span>

                <Link
                  to={link.path}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {t(link.label)}
                </Link>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:opacity-100"></span>
              </li>
            ))}
          </ul>
        </div>
        {/* social media section */}
        <div className=" mb-6 flex  w-full flex-col items-center">
          <h3 className="mb-4 text-lg font-semibold">{t("followUs")}</h3>
          <ul className="flex flex-row justify-start gap-10 ">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white"
                >
                  <img
                    src={link.img}
                    alt={link.name}
                    className="h-6 hover:scale-110 sm:h-7"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* copy right  */}
      <div className="mt-6 bg-indigo-900 py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} {t("cr")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
