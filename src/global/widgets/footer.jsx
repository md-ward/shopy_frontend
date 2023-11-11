import { Link } from 'react-router-dom';
import useTranslationStore from '../state/useTranslationStore';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com', img: '/assets/facebook.svg' },
    { name: 'Twitter', url: 'https://www.twitter.com', img: '/assets/x.svg' },
    { name: 'Instagram', url: 'https://www.instagram.com', img: '/assets/instagram.svg' },
  ];

  const { t, currentLanguage } = useTranslationStore();
  const navLinks = [
    { path: "/", label: "home" },
    { path: "/shop", label: "shop" },
    { path: "/about", label: "about" },
    { path: "/contact", label: "contact" },
  ];

  return (
    <footer className="custome_grad select-none text-white py-6" dir={currentLanguage == 'ar' ? 'rtl' : 'ltr'} >
      <div className="container mx-auto px-4">
        <div className="flex max-sm:flex-wrap gap-2">
          {/* about us section */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">{t('about')}</h3>
            <p>{t('about_text')}</p>
          </div>
          {/* contact us section */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6   sm:ltr:ml-10 sm:rtl:mr-10 select-text" >
            <h3 className=" text-lg font-semibold mb-4 select-none">{t('contact')}</h3>
            <p>123 Main Street, City, Country</p>
            <p>info@example.com</p>
            <p>+1 234 567 890</p>
          </div>
          {/* nav links section */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">{t('quick_links')}</h3>
            <ul>
              {navLinks.map((link, index) => (
                <li key={index} className="mb-2 relative group w-fit">
                  <span className="absolute w-0 group-hover:w-full h-0.5 bg-white -top-1   right-0 opacity-0 group-hover:opacity-100 duration-300 ease-in-out transition-all"></span>

                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {t(link.label)}
                  </Link>
                  <span className="absolute w-0 group-hover:w-full h-0.5 bg-white -bottom-1 left-0 opacity-0 group-hover:opacity-100 duration-300 ease-in-out transition-all"></span>
                </li>
              ))}
            </ul>
          </div>
          {/* social media section */}
          <div className=" w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">{t('followUs')}</h3>
            <ul className="flex flex-row justify-start gap-10 ">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">

                    <img src={link.img} alt={link.name
                    }
                      className='h-6 sm:h-7 hover:scale-110'
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* copy right  */}
      <div className="mt-6 py-4 bg-indigo-900 text-center"> 
        <p>&copy; {new Date().getFullYear()} {t('cr')}</p>
      </div>
    </footer>
  );
};

export default Footer;