import { AiFillCarryOut, AiOutlineFieldTime } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { IoIosAnalytics } from "react-icons/io";
import { MdOutlineManageHistory } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";

import { routeKeys } from '@/constants/routes';



// declare the list menu of sidebars
export const sidebarMenus =  [
    { name: "Employee Management", link: routeKeys.EMPLOYEES, icon: PiUsersThreeLight },
    { name: "Reports and Analytics", link: routeKeys.CATALOGUE, icon: IoIosAnalytics },
    { name: "Leave", link: routeKeys.LEAVE, icon: AiFillCarryOut },
    { name: "Recruitment", link: routeKeys.RECRUITMENT, icon: MdOutlineManageHistory },
    { name: "Performance", link: routeKeys.PERFORMANCE, icon: AiOutlineFieldTime },
    { name: "Settings", link: routeKeys.SYSTEM_USERS, icon: CiSettings },
];