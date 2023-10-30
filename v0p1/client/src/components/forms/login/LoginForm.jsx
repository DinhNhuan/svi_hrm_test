// Import necessary dependencies and components
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { object, string } from "yup";

import { IoMdLogIn } from "react-icons/io";

import { userLogin } from "@/redux/authSlice/AuthSlice";

import Loading from "@/components/Loading";
import { Button, Input } from "@/components/common";
import { routeKeys } from "@/constants/routes";

// Define a validation schema using Yup
const schema = object({
  email: string().required("Email is required"),
  password: string().required("Password is required"),
}).required();

// Define the LoginForm component
const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      // Display a success toast message
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (userInfo) {
      let { roles, user_id } = userInfo;
      let isAdmin = roles.filter((role) => role.accessor === "admin");
      if (isAdmin.length > 0) {
        navigate(routeKeys.EMPLOYEES);
      } else {
        navigate(`/employee/${user_id}/profile`);
      }
    }
  }, [userInfo]);

  // Access the navigation function from React Router
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };

  // Initialize the useForm hook with validation resolver
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialState, resolver: yupResolver(schema) });

  // Define the form submit handler
  const onSubmit = async (data) => {
    await dispatch(userLogin(data));
  };

  // Render the login form
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex 
                      flex-col
                      gap-y-6
                      w-full"
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              id="email"
              {...field}
              label="email"
              placeholder="email"
              disabled={isLoading}
              error={errors.email?.message}
              className={`w-full
                                        px-3
                                        py-2
                                        border
                                        rounded-lg
                                        text-sm
                                        text-secondary-500
                                        placeholder:text-xs
                                        ${
                                          errors.email?.message
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        } 
                                        focus:outline-none 
                                        focus:border 
                                        focus:border-slate-600`}
            />
          )}
        />

        {/* Password input field */}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="password"
              type="password"
              label="Password"
              placeholder="password"
              disabled={isLoading}
              error={errors.password?.message}
              className={`w-full
                                        px-3
                                        py-2
                                        border
                                        rounded-lg
                                        text-sm
                                        text-secondary-500
                                        placeholder:text-xs
                                        ${
                                          errors.password?.message
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        } 
                                        focus:outline-none 
                                        focus:border 
                                        focus:border-slate-600`}
            />
          )}
        />

        {/* Login button */}
        <Button
          className="
                            from-primary-600
                            bg-gradient-to-l 
                            bg-[#FFA500]
                            hover:bg-primary-500
                            duration-150
                            text-white
                            py-2
                            px-6
                            relative"
          type="submit"
          disabled={isLoading}
        >
          Login
          <span className="absolute right-2 top-2 ">
            <IoMdLogIn size={20} />
          </span>
        </Button>
      </form>

      <Loading isOpen={isLoading} />
    </>
  );
};

export default LoginForm;
