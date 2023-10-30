import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "@/components/common";
import { updateEmployeeInfo } from "@/api/employeeApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeAttributeForm = ({ group, employeeInfo }) => {
  const { id } = useParams();

  const [isEditable, setIsEditable] = useState(false);

  const defaultValues = {};
  group?.attributes.forEach(
    (attribute) =>
      (defaultValues[attribute.accessor] =
        employeeInfo?.[attribute.accessor] !== null
          ? employeeInfo?.[attribute.accessor]
          : "")
  );

  const {
    control,
    formState: { errors, isDirty, dirtyFields, isValid },
    handleSubmit,
  } = useForm({ defaultValues });

  // this function to handlle editable
  const handleEditable = () => {
    setIsEditable(true);
  };

  // This function to handle form submission
  const onSubmit = async (formData) => {
    let url = `/employee/update-employee-info/${id}`;
    const { message } = await updateEmployeeInfo(url, formData);
    if (message === "success") {
      toast.success("Successfully Updated", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error("Update Failed", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setIsEditable(false);
  };

  return (
    <div className="p-3 rounded-3xl bg-light w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* header */}
        <div className="border-b">
          <p className="text-secondary-500 capitalize p-2 font-bold">
            {group.name}
          </p>
        </div>

        {/* Body */}
        <div className="flex justify-start flex-wrap py-5 items-end">
          {group?.attributes &&
            group?.attributes.map((item, index) => (
              <div
                key={item.id}
                className=" basis-1/2 lg:basis-1/3 2xl:basis-1/4 p-3 px-5"
              >
                <Controller
                  name={item.accessor}
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Input
                      required={item.isRequired === 1 ? true : false}
                      disabled={!isEditable}
                      id={item.id}
                      label={item.name}
                      type={item.type}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...ref}
                      error={errors.email?.message}
                      className={`w-full px-3 py-2 border rounded-lg text-sm text-secondary-500 placeholder:text-xs
                                ${
                                  errors[item.accessor]?.message
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } 
                                focus:outline-none focus:border focus:border-slate-600`}
                    />
                  )}
                />
              </div>
            ))}
        </div>

        {/* Button */}
        <div className="flex justify-end items-center gap-2 py-4 border-t">
          <Button
            type="button"
            disabled={isEditable}
            className={`  duration-300 text-light outline-none
                        ${
                          isEditable
                            ? "bg-primary-300"
                            : "bg-primary-500 hover:bg-primary-600"
                        }
                        `}
            onClick={handleEditable}
          >
            Edit
          </Button>
          <Button
            type="submit"
            disabled={isEditable && isDirty ? false : true}
            className={`  duration-300 text-light outline-none
                         ${
                           isDirty && isEditable
                             ? "bg-primary-500 hover:bg-primary-600"
                             : "bg-primary-300"
                         }
                        `}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeAttributeForm;
