import React from "react";
import { RiUserSharedLine } from "react-icons/ri";
import { logo } from "@/assets/images";
import LoginForm from "@/components/forms/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-white w-screen h-screen flex justify-center items-center">
      <div
        className="p-5
                            shadow-[0rem_0.375rem_1.125rem_0.125rem_rgba(234,234,234,1)]
                            border
                            border-slate-300
                            rounded-xl
                            overflow-hidden
                            flex 
                            flex-col
                            justify-center
                            items-center
                            min-w-[20rem]"
      >
        {/* Logo */}
        <div className="w-32 h-auto">
          <img className="w-full object-cover" src={logo} alt="Savarti Logo" />
        </div>

        {/* Title */}
        <div
          className="flex
                                gap-2
                                justify-start
                                items-center
                                w-full
                                text-secondary-600
                                mt-6"
        >
          <RiUserSharedLine size={20} />
          <h2
            className="capitalize
                                    text-lg
                                    font-nutito
                                    font-bold
                                    text-secondary-600"
          >
            Login
          </h2>
        </div>

        <div className="mt-4 w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
