import axiosInstance from "../instances/baseURL.js";

export const getDepartments = async () => {
  const response = await axiosInstance.get("/departments", {
    withCredentials: true,
  });
  return response.data.departments;
};

export const createDepartment = async (departmentData) => {
  const response = await axiosInstance.post(
    "/departments",
    {
      departmentData: departmentData,
    },
    {
      withCredentials: true,
    },
  );
};

export const updateDepartment = async (id, departmentData) => {
  const response = await axiosInstance.put(
    `/departments/${id}`,
    {
      departmentData: departmentData,
    },
    {
      withCredentials: true,
    },
  );
};

export const deleteDepartment = async (id) => {
  const response = await axiosInstance.delete(`/departments/${id}`, {
    withCredentials: true,
  });
};
