import axiosInstance from "../instances/baseURL.js";

export const getDepartments = async () => {
  const response = await axiosInstance.get("/departments");
  return response.data.departments;
};

export const createDepartment = async (departmentData) => {
  const response = await axiosInstance.post("/departments", {
    departmentData: departmentData,
  });
};

export const updateDepartment = async (id, departmentData) => {
  const response = await axiosInstance.put(`/departments/${id}`, {
    departmentData: departmentData,
  });
};

export const deleteDepartment = async (id) => {
  const response = await axiosInstance.delete(`/departments/${id}`);
};
