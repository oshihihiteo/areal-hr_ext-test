import axiosInstance from "../instances/baseURL.js";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data.users;
};

export const createUser = async (userData) => {
  const response = await axiosInstance.post("/users", {
    userData: userData,
  });
};

export const updateUser = async (id, userData) => {
  const response = await axiosInstance.put(`/users/${id}`, {
    userData: userData,
  });
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
};

export const limitUser = async (id) => {
  const response = await axiosInstance.put(`/users/${id}/limit-access`);
};
