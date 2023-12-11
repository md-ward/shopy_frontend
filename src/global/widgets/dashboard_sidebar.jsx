import {
  faChartBar,
  faFileInvoice,
  faPlus,
  faClipboardList,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap/gsap-core";
import { useEffect, useRef } from "react";

import { NavLink } from "react-router-dom";

const navigationLinks = [
  {
    to: "/admin/statistics",
    label: "Statistics",
    icon: faChartBar,
  },
  {
    to: "/admin/invoice-and-billing",
    label: "Invoice and Billing",
    icon: faFileInvoice,
  },
  {
    to: "/admin/add-products",
    label: "Add Products",
    icon: faPlus,
  },
  {
    to: "/admin/orders",
    label: "Orders",
    icon: faClipboardList,
  },
  {
    to: "/admin/inventory",
    label: "Inventory",
    icon: faBox,
  },
];

const DashboardSidebar = () => {
  return (
    <div className="custome_grad   hidden w-64 flex-col text-white sm:flex">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className=" mt-8  flex flex-grow flex-col gap-8">
        {navigationLinks.map((link) => (
          <NavLink
            replace
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? "m-1 rounded-md bg-blue-600 px-4 py-2 duration-200 ease-in-out"
                : "px-4 py-2 hover:bg-blue-600"
            }
          >
            <FontAwesomeIcon icon={link.icon} className="mx-2" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;

export const BottomNavigationBar = () => {
  const navRef = useRef();

  useEffect(() => {
    if (
      window.location.pathname != "/admin" &&
      window.location.pathname != "/admin/"
    ) {
      handleNavClick(
        navigationLinks.findIndex(
          (link) => link.to == window.location.pathname,
        ),
      );
    }
  });
  function handleNavClick(index) {
    const icon = document.getElementById(`icon-${index}`);
    const xPos = icon.getBoundingClientRect().x;

    const timeline = gsap.timeline();
    timeline.to("#sp", { translateX: xPos, duration: 0.2 });
  }

  return (
    <nav
      ref={navRef}
      className="custome_grad z-50 grid w-full grid-cols-5 rounded-t-md p-4  duration-200 ease-in-out sm:hidden  "
    >
      {navigationLinks.map((link, index) => (
        <NavLink
          className={"peer"}
          onClick={() => handleNavClick(index)}
          key={link.to}
          to={link.to}
        >
          <FontAwesomeIcon
            id={`icon-${index}`}
            icon={link.icon}
            className="z-20 aspect-square p-2  "
          />
        </NavLink>
      ))}
      <span
        id="sp"
        className="absolute left-0
        -z-10 col-span-1 hidden aspect-square   w-8 place-self-center rounded-full  bg-white transition-all duration-300  ease-in-out peer-[&.active]:block"
      ></span>
    </nav>
  );
};
