import axiosInstance from "../instances/baseURL.js";

export const getActions = async () => {
  const response = await axiosInstance.get("/actions", {
    withCredentials: true,
  },);
  return response.data.actions;
};
