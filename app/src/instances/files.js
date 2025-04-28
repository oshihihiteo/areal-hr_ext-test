import axiosInstance from "../instances/baseURL.js";

export const getFiles = async () => {
  const response = await axiosInstance.get("/files", {
    withCredentials: true,
  });
  return response.data.files;
};

export const getRawFileById = async (id) => {
  const response = await axiosInstance.get(`/files/${id}/raw`, {
    withCredentials: true,
  });
  return response.data;
};

export const createFile = async (fileData) => {
  const response = await axiosInstance.post("/files", fileData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const updateFile = async (id, fileData) => {
  const response = await axiosInstance.put(`/files/${id}`, fileData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};


export const deleteFile = async (id) => {
  const response = await axiosInstance.delete(`/files/${id}`, {
    withCredentials: true,
  });
};
