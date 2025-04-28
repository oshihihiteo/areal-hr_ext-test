import axiosInstance from "../instances/baseURL.js";

export const getHrOperations = async () => {
  const response = await axiosInstance.get("/hr-operations", {
    withCredentials: true,
  });
  return response.data.hr_operations;
};

export const createHrOperation = async (hrOperationData) => {
  const response = await axiosInstance.post(
    "/hr-operations",
    {
      hrOperationData: hrOperationData,
    },
    {
      withCredentials: true,
    },
  );
};

export const updateHrOperation = async (id, hrOperationData) => {
  const response = await axiosInstance.put(
    `/hr-operations/${id}`,
    {
      hrOperationData: hrOperationData,
    },
    {
      withCredentials: true,
    },
  );
};

export const deleteHrOperation = async (id) => {
  const response = await axiosInstance.delete(`/hr-operations/${id}`, {
    withCredentials: true,
  });
};
