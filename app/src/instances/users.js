import axiosInstance from "../instances/baseURL.js";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users", {
    withCredentials: true,
  });
  return response.data.users;
};

export const createUser = async (userData) => {
  const response = await axiosInstance.post(
    "/users",
    {
      userData: userData,
    },
    {
      withCredentials: true,
    },
  );
};

export const updateUser = async (id, userData) => {
  const response = await axiosInstance.put(
    `/users/${id}`,
    {
      userData: userData,
    },
    {
      withCredentials: true,
    },
  );
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`, {
    withCredentials: true,
  });
};

export const limitUser = async (id) => {
  const response = await axiosInstance.put(`/users/${id}/limit-access`, {},{
    withCredentials: true,
  });
};
