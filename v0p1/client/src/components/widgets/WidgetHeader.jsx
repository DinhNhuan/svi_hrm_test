import React from 'react'
import { IoMdSettings } from 'react-icons/io';



const WidgetHeader = ({ title, icon }) => {
    return (
        <div>
            <div className="flex justify-between items-center py-2 text-secondary-700 font-nutito text-sm">
                <div className="flex gap-2 justify-start items-center ">
                    {React.createElement(icon, { size: "20" })}
                    <h3 className="font-bold capitalize">{title}</h3>
                </div>
                <button className='rounder-full  p-2 rounded-full cursor-pointer  hover:bg-secondary-100 duration-300'>
                    <IoMdSettings />
                </button>
            </div>
        </div>
    )
}

export default WidgetHeader;