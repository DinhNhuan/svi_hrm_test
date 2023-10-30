import React from "react";
import { IoMdClose } from "react-icons/io";


const Modal = ({ isOpen, onClose, title, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black opacity-50"></div>

                    <div className="bg-white  rounded-2xl shadow-lg relative border-none min-w-[20rem]">

                        {/* Button close modal */}
                        <div className="
                                absolute 
                                right-[-10px]
                                top-[-10px] 
                                bg-secondary-300 
                                duration-150 
                                hover:bg-secondary-400 
                                shadow-md 
                                p-1.5 
                                flex 
                                justify-center 
                                items-center 
                                text-white 
                                rounded-full 
                                text-xs
                                cursor-pointer"
                            onClick={onClose}
                        >
                            <button className="text-xs">
                                <IoMdClose size={13} />
                            </button>
                        </div>

                        <div className="flex justify-start items-center  w-full border-b p-5">
                            {/* modal title */}
                            <h2
                                className="text-sm font-semibold font-nunito text-secondary-500">{title}
                            </h2>

                        </div>

                        {/* Modal body */}
                        <div className="pt-3">
                            {children}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
