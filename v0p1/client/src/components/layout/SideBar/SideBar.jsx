import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import { AiFillCarryOut, AiOutlineFieldTime } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoIosAnalytics } from "react-icons/io";
import { MdOutlineManageHistory } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";

import { routeKeys } from "@/constants/routes";

import { defaultPhoto } from "@/assets/images";
import { SIDEBAR_TOGGLE } from "@/constants/enum";

function SideBar() {
  const location = useLocation();

  // Access redux store to get the user info
  const { userInfo } = useSelector((state) => state.auth);

  const userRoles =
    userInfo &&
    userInfo.roles?.map((role) => (
      <span key={role.id} className="capitalize">
        {role.name}
      </span>
    ));

  // State to track whether the sidebar is open or closed
  const [activeMenu, setActiveMenu] = useState(
    () => localStorage.getItem(SIDEBAR_TOGGLE) === "yes"
  );

  const adminRoles = userInfo.roles?.filter(
    (role) => role.accessor === "admin"
  );

  const sidebarMenus = [
    {
      name: "Employee Management",
      link:
        adminRoles.length > 0
          ? routeKeys.EMPLOYEES
          : `/employee/${userInfo.user_id}/profile`,
      icon: PiUsersThreeLight,
    },
    {
      name: "Reports and Analytics",
      link: routeKeys.CATALOGUE,
      icon: IoIosAnalytics,
    },
    { name: "Leave", link: routeKeys.LEAVE, icon: AiFillCarryOut },
    {
      name: "Recruitment",
      link: routeKeys.RECRUITMENT,
      icon: MdOutlineManageHistory,
    },
    {
      name: "Performance",
      link: routeKeys.PERFORMANCE,
      icon: AiOutlineFieldTime,
    },
    { name: "Settings", link: routeKeys.SYSTEM_USERS, icon: CiSettings },
  ];

  // Function to toggle the sidebar open/closed state and update local storage
  const toggleSidebar = () => {
    setActiveMenu((prevActiveMenu) => {
      const newActiveMenu = !prevActiveMenu;
      localStorage.setItem(SIDEBAR_TOGGLE, newActiveMenu ? "yes" : "no");
      return newActiveMenu;
    });
  };

  // Get the current URL using the "useLocation" hook
  const currentURL = `/${location.pathname.split("/")[1]}`;

  // Open/Close the sidebar when the route changes
  useEffect(() => {
    setActiveMenu(() => localStorage.getItem(SIDEBAR_TOGGLE) === "yes");
  }, []);

  return (
    <div
      className=" bg-primary-500
                        bg-gradient-to-b 
                        from-primary-400
                        border-none
                        rounded-br-[47px]
                        
                        "
    >
      <div
        className={`
                ${activeMenu ? "w-64" : "w-20"}        
                h-screen
                flex
                flex-col
                gap-y-10
                relative
                border-r
                bg-white
                rounded-r-[45px]`}
      >
        {/* Button to toggle the sidebar */}
        <div
          className="
                    absolute
                    right-[-10px]
                    top-16
                    p-1
                    bg-primary-500
                    hover:bg-primary-400                    
                    text-white
                    duration-150
                    rounded-full
                    cursor-pointer
                    z-20"
          onClick={toggleSidebar}
        >
          <span className="text-sm font-bold">
            {activeMenu ? <BsChevronCompactLeft /> : <BsChevronCompactRight />}
          </span>
        </div>

        {/* User information */}
        <div className="sideBar-header flex justify-center mt-10">
          <div className={`flex flex-col items-center gap-3  `}>
            <div
              className={`shadow-sm bg-secondary-100 duration-500 p-2 rounded-full ${
                activeMenu ? "w-24 h-24" : "w-10 h-10"
              } `}
            >
              <div className="rounded-full w-full h-full overflow-hidden ">
                <img
                  src={
                    userInfo && userInfo?.avatar
                      ? userInfo?.avatar
                      : defaultPhoto
                  }
                  alt="avatar"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
            <div
              className={`${
                activeMenu ? "" : "hidden"
              } flex flex-col items-center gap-2 mt-3`}
            >
              <Link
                to=""
                className={` text-md text-secondary-600 font-extrabold`}
              >
                {activeMenu ? userInfo.sub : ""}
              </Link>
              <p className={`text-md text-secondary-600 font-medium `}>
                {userRoles}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar menu items */}
        <div className="sideBar-menu overflow-hidden pb-5">
          {sidebarMenus.map((menu, index) => (
            <Link
              key={index}
              to={menu.link}
              className={`
                            group flex items-center text-sm gap-3.5 font-medium p-3 mr-3 rounded-r-3xl
                            ${
                              currentURL === menu.link
                                ? "bg-primary-500 hover:bg-primary-400 text-white"
                                : "text-secondary-700 hover:bg-primary-100"
                            }
                        `}
            >
              <div className={`${!activeMenu ? "duration-500 ml-2" : ""}`}>
                {React.createElement(menu.icon, { size: "20" })}
              </div>
              <h2
                style={{ transitionDelay: `${index + 5}0ms` }}
                className={`whitespace-pre duration-500 capitalize leading-5 ${
                  !activeMenu ? "opacity-0 translate-x-28 overflow-hidden" : ""
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`
                                ${
                                  activeMenu
                                    ? "hidden"
                                    : "z-50 absolute left-48 bg-white font-semibold whitespace-pre text-secondary-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit"
                                }
                            `}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
