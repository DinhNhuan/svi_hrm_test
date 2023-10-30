import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { object, string, date } from "yup";
import { toast } from "react-toastify";

import {
  addUser,
  uploadImage,
  validateEmail,
  getCreateUserFields,
  getSVIIdList,
  getEmailList,
} from "@/api/employeeApi";
import { defaultPhoto } from "@/assets/images";
import { Button, Input } from "@/components/common";
import Modal from "../Modal";
import {formatDate} from '@/utils/utils'
import Loading from '@/components/Loading'


const EmployeeModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
// tracking loading  
  const [isLoading,setLoading] = useState(false)

  const [fields, setFields] = useState([]);

  const [photoUrl, setPhotoUrl] = useState("");

  const [sviIdList, setSviIdList] = useState([])
  const [emailList, setEmailList] = useState([])


  // Fetch list fields neccesary for create user
  useEffect(() => {
    if (isOpen) {
      const getFields = async () => {
        let response = await getCreateUserFields();
        setFields(response.data);
      };
      getFields();
    }
  }, [isOpen]);

  // Check image existed in list fields
  const imageField = fields?.filter((field) => field.accessor === "image_url");

  
  const schema = {};

//   Define default validation rules
// Employee ID validation
  schema['svi_id'] = string().required('Employee ID is required').test("is-valid", "Employee ID already exists", (employeeId)=> {
    if (employeeId) {
        return !sviIdList.includes(employeeId.trim().toUpperCase());
    }
    return true
  });



  // Email validation
  schema['email'] = string()
  .required('Email is required')
  .test("is-existed", "Email already exists", (email)=> {
    if (email) {
        return !emailList.includes(email);
    }
    return true
  }).test('savarti-email',  "Email must be @savarti.com", (email)=> {
     if (email) {
        return email.endsWith("@savarti.com");
    }
    return true;
  });


//  Define validation rules for each field using forEach
  fields?.forEach((field) => {
    if (field.required === 1 && !schema.hasOwnProperty(field.accessor)) {
      if (field.type === "text" || field.type === "date") {
        schema[field.accessor] = string().required(`${field.name} is required`);
      }
    }
  });


  // Create a Yup object schema with the dynamically generated fields
  const dynamicSchema = object().shape(schema);



  // Initialize the useForm hook with validation resolver
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    setFocus,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(dynamicSchema),
  });

// Fetch the email created
  useEffect(() => {
    if (isOpen) {
        const fetchEmailList = async () => {
            let res = await getEmailList();
           return res.data
        }
        fetchEmailList().then((data) => {
            setEmailList(data)
        })
    }
  }, [isOpen])

//  fetch employee id list created
useEffect(() => {
    if (isOpen) {
        const fetchIdList = async () => {
            let res = await getSVIIdList();
            return res.data        
        }
        fetchIdList().then((data) => {
            setSviIdList(data)
        })
    }
  }, [isOpen])

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
    { 
     // validate employee ID existed
      if (name === "svi_id") {
        // Validate employee ID existence
        const isExisted = sviIdList.includes(value[name].trim().toUpperCase());
        setError(
          name,
          isExisted
            ? { type: 404, message: "Employee already exists" }
            : { type: 404, message: "" }
        );
      }
      
      // Validate email ID existed
     if (name === "email") {
        // Validate email existence
        const isExisted = emailList.includes(value[name]);
        setError(
          name,
          isExisted
            ? { type: "manual", message: "Email already exists" }
            : { type: "manual", message: "" }
        );
      }
    }
    )
    return () => subscription.unsubscribe()
  }, [watch, sviIdList, emailList ])

  // Function to handle form submition
  const handleFormSubmit = async (data) => {
    setLoading(true)
    const userData = { ...data,
         image_url: photoUrl,
          joined_date: data.joined_date ? formatDate(data.joined_date): ''
        };

      const employeeId = await addUser(userData);
      setLoading(false)
      if (employeeId) {
        toast.success("Employee created", {
          position: "top-right",
          autoClose: 2000,
        });
        

        setTimeout(() => {
          navigate(`/employee/${employeeId}/profile`);
        }, 3000);
      } else {
        navigate("/error");
      }
    
  };

  // handle close modal add employee
  const handleCloseModal = () => {
    reset();
    setPhotoUrl("");
    onClose && onClose();
  };

  // handle upload image to server
  const handleImageChange = async (event) => {
    const { files } = event.target;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);
      const image_url = await uploadImage(formData);
      setPhotoUrl(image_url);
    }
  };

  return (
    <Modal title="Add Employee" isOpen={isOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* body */}
        <div className="flex  gap-2 p-5 max-w-[50rem] 2xl:max-w-[60rem]">
          {/* Left avatar */}
          {imageField && imageField.length > 0 && (
            <div className=" p-5 select-none">
              <div className="border bg-secondary-200 p-2 rounded-full relative w-40 h-40">
                <img
                  src={photoUrl ? photoUrl : defaultPhoto}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full shadow-md overflow-hidden select-none"
                />
                <div className="absolute bottom-4 right-2  p-1.5 border-none hover:bg-secondary-500 text-secondary-700 hover:text-white rounded-full duration-300 cursor-pointer">
                  <CiSettings size={21} className="cursor-pointer" />
                  <input
                    name="image"
                    type="file"
                    className="opacity-0 absolute top-0 bottom-0 w-full h-full cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Right information */}
          <div className="flex flex-wrap">
            {fields &&
              fields.length > 0 &&
              fields.map((item) => {
                if (item.accessor !== "image_url") {
                  return (
                    <div key={item.id} className="basis-1/3 p-2">
                      <Controller
                        name={item.accessor}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            {...field}
                            id={item.accessor}
                            label={item.name}
                            type={item.type}
                            placeholder={item.name}
                            className="outline-none
                                        border
                                        border-slate-300
                                        focus:border-slate-400
                                        text-xs
                                        rounded-xl
                                        p-3"
                            error={errors[item.accessor]?.message}
                          />
                        )}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>

        {/* Button Actions */}
        <div className="flex justify-end items-center gap-2 mt-2 p-5 border-t ">
          <Button
            className="px-8 py-2 bg-primary-500 text-white border border-primary-500 hover:bg-primary-400 duration-300 text-xs"
            type="submit"
          >
            Save
          </Button>

          <Button
            className="px-6 py-2 bg-white text-primary-500  border border-primary-500 hover:bg-primary-50 duration-300 text-xs"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </div>
      </form>
      <Loading isOpen={isLoading}/>
    </Modal>
  );
};

export default EmployeeModal;
