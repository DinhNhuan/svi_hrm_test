import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routeKeys } from "@/constants/routes";

// Define the TopMenu component
const TopMenu = ({ menuItems }) => {
  const navigate = useNavigate();

  // Create a ref to store references to submenu elements
  const submenuRefs = useRef(menuItems?.map(() => null));

  // State to track the index of open submenus
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  // Function to toggle open/close state of submenu
  const handleToggle = (index) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Function to handle clicks outside submenus to close them
  const handleClick = (event) => {
    let clickedOutside = true;

    // Check if the click occurred within any of the submenu refs
    submenuRefs?.current?.forEach((ref) => {
      if (ref && ref.contains(event.target)) {
        clickedOutside = false;
      }
    });

    if (clickedOutside) {
      setOpenSubMenuIndex(null);
    }
  };

  // Get the current URL using the "useLocation" hook
  const location = useLocation();
  const currentURL = `${location.pathname}${location.search}`;

  // Add a click event listener to handle clicks outside the component
  useEffect(() => {
    document.addEventListener("click", handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="px-10 py-2 bg-white w-full flex items-center justify-between gap-3 border-b border-secondary-200">
      {/* Dashboard */}
      <div
        className={` 
                            group
                            dashboard
                            ${
                              currentURL === routeKeys.DASHBOARD
                                ? "bg-primary-100 text-primary-500 font-bold"
                                : "bg-secondary-50 text-secondary-500"
                            } 
                            home
                            py-2
                            px-3
                            rounded-xl
                            bg-secondary-100
                            hover:bg-primary-100
                            cursor-pointer
                            after:content-[attr(before)]
                        `}
        onClick={() => navigate(routeKeys.DASHBOARD)}
      >
        <span className="text-secondary-500 group-hover:text-primary-500 duration-300">
          <AiOutlineHome size={20} />
        </span>
      </div>

      {/* Top menu items */}

      <div className=" flex grow gap-3 justify-start items-center px-5 border-x">
        {menuItems &&
          menuItems.map((item, index) => (
            <div
              key={item.name}
              className={`group 
                                    px-4
                                    py-2
                                    rounded-xl
                                    hover:bg-primary-100
                                    flex
                                    justify-center
                                    items-center
                                    min-w-[120px]
                                    duration-300
                                    relative
                                    font-nunito
                                    ${
                                      currentURL === item.link
                                        ? "bg-primary-100 text-primary-500 font-bold"
                                        : "bg-secondary-50 text-secondary-500"
                                    }`}
            >
              {item && item.children && item.children?.length > 0 ? (
                // If there are children, show a submenu
                <div
                  ref={(ref) => (submenuRefs.current[index] = ref)}
                  className="cursor-pointer flex justify-center items-center gap-2 text-xs  group-hover:text-primary-500 "
                  onClick={() => handleToggle(index)}
                >
                  {item.name}
                  <BiChevronDown />
                </div>
              ) : (
                // If no children, show a link
                <Link
                  to={item && item?.link ? item.link : ""}
                  className={`capitalize text-xs  duration-300  group-hover:text-primary-500 ${
                    currentURL === item.link ? "text-primary-500" : ""
                  }`}
                >
                  {item.name}
                </Link>
              )}

              {/* Render submenu if there are children */}
              {item && item.children && item.children.length > 0 && (
                <div
                  className="absolute hidden top-[130%] w-auto left-0 p-3 bg-white border rounded-md min-w-[15rem] max-w-[15rem] z-30"
                  style={{
                    display: openSubMenuIndex === index ? "block" : "none",
                  }}
                >
                  {item.children.map((child) => (
                    <div
                      className={`group test p-2 w-full hover:bg-secondary-100 rounded-2xl cursor-pointer`}
                      key={child.name}
                    >
                      <Link
                        to={child && child?.link ? child?.link : ""}
                        className="capitalize group-[.test]:hover:font-bold duration-200 text-xs"
                      >
                        {child.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Filter */}
      <div className="pl-3">
        <div className="border bg-secondary-100 text-secondary-500 rounded-full p-2 flex justify-center items-center cursor-pointer">
          <FiFilter />
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
