import axiosInstance from "../instances/baseURL.js";

export const getChangelog = async () => {
  const response = await axiosInstance.get("/changelog", {
    withCredentials: true,
  });
  return response.data.changelog;
};
