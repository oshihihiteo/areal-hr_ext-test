import axiosInstance from "../instances/baseURL.js";

export const getDepartmentsNames = async () => {
  const response = await axiosInstance.get("/options/departments", {
    withCredentials: true,
  });
  return response.data.departments;
};

export const getPositionsNames = async () => {
  const response = await axiosInstance.get("/options/positions", {
    withCredentials: true,
  });
  return response.data.positions;
};

export const getOrganizationsNames = async () => {
  const response = await axiosInstance.get("/options/organizations", {
    withCredentials: true,
  });
  return response.data.organizations;
};

export const getActionsNames = async () => {
  const response = await axiosInstance.get("/options/actions", {
    withCredentials: true,
  });
  return response.data.actions;
};

export const getEmployeesWithDepartmentsAndPositions = async () => {
  const response = await axiosInstance.get("/options/employees", {
    withCredentials: true,
  });
  return response.data.employeesWithDepartmentsAndPositions;
};
