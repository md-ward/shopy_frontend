import gsap from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';

const Navbar = () => {
  const header_items = ['Home', 'Shop', 'About', 'Contact Us'];


  const [expand, setExpand] = useState(true);
  const [toggleSearch, settoggleSearch] = useState(false);


  const navLinksRef = useRef();
  const iconButtonsRef = useRef();
  const searchRef = useRef();

  const icon_buttons = [
    { src: 'assets/cart.svg', alt: 'shopping cart', fun: () => { } },
    { src: 'assets/bell.svg', alt: 'notification bell', fun: () => { } },
    { src: 'assets/search.svg', alt: 'search icon', fun: searchAnimation },
  ];
  function playAnimation() {
    if (expand) {
      gsap
        .timeline()
        .to(navLinksRef.current, { opacity: 0, duration: 0.3, ease: 'power3' })
        .add(() => {
          navLinksRef.current.classList.add('hidden');
          iconButtonsRef.current.classList.remove('max-sm:hidden');
        })
        .to(iconButtonsRef.current, { opacity: 1, duration: 0.3, ease: 'power3' });
    } else {
      gsap
        .timeline()
        .to(iconButtonsRef.current, { opacity: 0, duration: 0.3, ease: 'power3' })
        .add(() => {
          navLinksRef.current.classList.remove('hidden');
          iconButtonsRef.current.classList.add('max-sm:hidden');
        })
        .to(navLinksRef.current, { opacity: 1, duration: 0.3, ease: 'power3' });
    }
  }

  function searchAnimation() {
    const searchInput = searchRef.current;

    if (!toggleSearch) {
      settoggleSearch(!toggleSearch);

      gsap.fromTo(
        searchInput,
        { width: 0, opacity: 0 },
        {
          width: '200px', opacity: 1, duration: 0.3, ease: 'power3',
        }
      );
    } else {
      gsap.fromTo(
        searchInput,
        { width: '200px', opacity: 1 },
        {
          width: 0, opacity: 0, duration: 0.3, ease: 'power3', onComplete: () => {
            settoggleSearch(!toggleSearch);
          }
        }
      );
    }
  }



  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650) {
        navLinksRef.current.style.opacity = 1;
        iconButtonsRef.current.style.opacity = 1;
        navLinksRef.current.classList.remove('hidden');
        iconButtonsRef.current.classList.add('max-sm:hidden');
        setExpand(true)
      }
    };


    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="grid grid-cols-12 custome_grad py-2 ">
      {/* Logo */}
      <div className="hidden sm:flex items-center pl-8 font-[AttackGraf] cursor-pointer sm:col-span-3">
        <h1 className="text-3xl font-bold text-white">Shopy</h1>
      </div>





      {/* Navigation Items */}
      <ul
        ref={navLinksRef}
        className="flex flex-row items-center justify-evenly w-full font-[Pacifico] ml-auto mr-8 space-x-6 col-span-11 sm:col-span-6"
      >
        {header_items.map((item, index) => (
          <li
            key={index}
            className="text-white hover:text-gray-300 cursor-pointer transition-colors duration-200"
          >
            {item}
          </li>
        ))}
      </ul>


      {/* Icon Buttons */}
      <section
        ref={iconButtonsRef}
        className="max-sm:hidden flex flex-row justify-evenly items-center col-span-11 sm:col-span-3"
      >
        {/* search bar  */}
        <input type="search" ref={searchRef} name="search" className={`rounded-lg  ${toggleSearch ? 'block' : 'hidden'}`} />

        {/* icon buttons */}
        {icon_buttons.map((icon, index) => (
          <img

            onClick={ icon.fun}
            key={index}
            src={icon.src}
            alt={icon.alt}
            className="h-6 sm:h-6   cursor-pointer"
          />
        ))}
      </section>


      {/* Arrow Icon */}
      <div
        className={`flex sm:hidden justify-center items-center col-span-1  ${expand ? 'rotate-180' : 'rotate-0'
          } duration-150 ease-in-out transition-all`}
        onClick={() => {
          setExpand(!expand);
          playAnimation()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </nav>
  );
};

export default Navbar;