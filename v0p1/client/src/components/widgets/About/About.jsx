import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { LiaUserLockSolid } from "react-icons/lia";
import { LuMapPin, LuSettings } from "react-icons/lu";
import { MdOutlineWorkHistory } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";

import { defaultPhoto } from "@/assets/images";
import WidgetLayout from "../WidgetLayout";
import { getUserProfile, uploadImage, updateAvatar } from "@/api/employeeApi";
import { formatDate } from "@/utils/utils";
import { toast } from "react-toastify";

const About = () => {
  const { id } = useParams();

  const [userProfile, setUserProfile] = useState(null);

  const [photoUrl, setPhotoUrl] = useState(null);

  const initialize = useRef(null);

  useEffect(() => {
    if (!initialize.current) {
      initialize.current = true;
      const fetchUserProfile = async () => {
        const item = await getUserProfile(
          `/employee/get-user-profile?employeeId=${id}`
        );
        setUserProfile(item.data);
        setPhotoUrl(item.data.image)
      };
      fetchUserProfile();
    }
  }, [id]);

    // handle upload image to server
  const handleImageChange = async (event) => {
    const { files } = event.target;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);
      const imageUrl = await uploadImage(formData);

      const imageData = {"imageUrl": imageUrl, "userId": userProfile.id}
      let isSuccess = await updateAvatar(imageData)

      if (isSuccess) {
        toast.success(`Avatar updated successfully.`)
        setTimeout(() => {setPhotoUrl(imageUrl)}, 2000);
      } else {
        toast.error(`Avatar update failed.`)
      }
      
    }
  };

  return (
    <WidgetLayout title="About" widgetIcon={PiUserListFill}>


      <div className="grow flex gap-2">
        <div className="flex flex-col justify-start items-center basis-2/5 p-8">
          <div
            className="
                                
                                flex
                                justify-center
                                items-center
                                bg-secondary-200 
                                w-44 
                                h-44
                                rounded-full
                                relative"
          >
            <div className="rounded-full w-[10rem] h-[10rem]  overflow-hidden">
              <img
                src={photoUrl ? photoUrl : defaultPhoto}
                alt="Avatar"
                className="object-fill w-full h-full"
              />
            </div>

            <button
              className="absolute bottom-4 right-2  p-1.5 border-none hover:bg-secondary-500 text-secondary-700 hover:text-white rounded-full duration-300 cursor-pointer"
            >
              <LuSettings />
              <input
                    name="image"
                    type="file"
                    className="opacity-0 absolute  bottom-0 top-0  right-1 w-full h-full cursor-pointer"
                    onChange={handleImageChange}
            />
            </button>
          </div>

          <div
            className="
                        flex 
                        flex-col 
                        justify-center 
                        items-center 
                        text-secondary-600 
                        gap-1 
                        mt-3"
          >
            <h3 className="font-bold font-nunito capitalize">
              {userProfile?.lastName} {userProfile?.middleName} {userProfile?.firstName}
              
            </h3>
            <small className="text-xs flex gap-2 justify-center items-center ">
              <span>
                <LuMapPin />
              </span>
              <span>SVI-SG - Viet Nam</span>
            </small>
          </div>
        </div>

        <div className="flex flex-col basis-3/5 p-8 gap-y-8">
          <div className="flex gap-x-4">
            {/* icon */}
            <span className="text-xl text-secondary-600">
              <LiaUserLockSolid size={38} />
            </span>

            {/* text */}
            <div className="text-secondary-600 flex flex-col gap-y-2 font-nutito">
              <h3 className="capitalize font-bold text-secondary-800">
                basic info
              </h3>
              <p className="text-xs capitalize">
                <strong>full name</strong>:
                <span>
                  {userProfile?.lastName} {userProfile?.middleName} {userProfile?.firstName}
                </span>
              </p>
              <p className="text-xs capitalize">
                <strong>employee ID</strong>: <span>{userProfile?.employeeId}</span>
              </p>
              <p className="text-xs capitalize">
                <strong>email</strong>:{" "}
                <span className="normal-case text-blue-700 text-xs">{userProfile?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-x-4">
            {/* icon */}
            <span className="text-xl text-secondary-600">
              <MdOutlineWorkHistory size={38} />
            </span>

            {/* text */}
            <div className="text-secondary-600 flex flex-col gap-y-2 font-nutito">
              <h3 className="capitalize font-bold text-secondary-800">job</h3>
              <p className="text-xs capitalize">
                <strong>Joined Date</strong>:{" "}
                <span>
                  {userProfile?.joinedDate &&
                    formatDate(userProfile?.joinedDate)}
                </span>
              </p>
              <p className="text-xs capitalize">
                <strong>Status</strong>:{" "}
                <span className="bg-green-100 rounded-3xl px-5 py-1 text-green-500">
                  Active
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </WidgetLayout>
  );
};

export default About;
