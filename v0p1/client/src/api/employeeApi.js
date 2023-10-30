import { routeKeys } from "@/constants/routes";
import axiosInstance from "./axios/axiosInstance";

// api upload image to server
export const uploadImage = async (files) => {
  try {
    const res = await axiosInstance.post("/service/upload-image", files, {
      headers: {
        // Set the content type to 'application/octet-stream' for binary data
        "Content-Type": "application/octet-stream",
      },
    });
    if (res.data && res.data.url) {
      return res.data.url;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const updateAvatar = async (formData) => {
    try {
        const res = await axiosInstance.post("/employee/update-avatar", formData);
        if (res.data.message === "success") {
            return true
        }
        return false;
    } catch (error) {
        return false;
    }
}

// handle fetch fields for employee
export const fecthFields = async () => {
  try {
    const response = await axiosInstance.get(routeKeys.GET_GROUP_ATTRIBUTES);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error occured:", error);
  }
};

// The function to handle check email exist in database
export const validateEmail = async (email) => {
  try {
    const response = await axiosInstance.post(routeKeys.EMAIL_VALID, email);
    return response.data.existed;
  } catch (error) {
    return error;
  }
};

export const addUser = async (formData) => {
  try {
    const response = await axiosInstance.post(routeKeys.WIZARD, formData);
    return response.data.employeeId;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserProfile = async (urlAPI) => {
  try {
    const { data } = await axiosInstance.get(urlAPI);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeList = async () => {
  try {
    const { data } = await axiosInstance.get("/employee/get-employee-list");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTableHeader = async () => {
  try {
    const { data } = await axiosInstance.get("/employee/get-table-headers");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCreateUserFields = async () => {
  try {
    const { data } = await axiosInstance.get(
      "/employee/get-user-create-fields"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeInfo = async (formData) => {
  try {
    const { data } = await axiosInstance.post(
      "/employee/get-employee-info",
      formData
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployeeInfo = async (url, formData) => {
  try {
    const { data } = await axiosInstance.patch(url, formData);

    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getEmailList = async () => {
  try {
    const { data } = await axiosInstance.get('/employee/get-email-list');
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getSVIIdList = async () => {
try {
    const { data } = await axiosInstance.get('/employee/get-svi-id-list');
    return data;
  } catch (error) {
    console.log(error);
  }
}