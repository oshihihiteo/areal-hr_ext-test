import axiosInstance from "../instances/baseURL.js";

export const getEmployees = async () => {
  const response = await axiosInstance.get("/employees", {
    withCredentials: true,
  });
  return response.data.employees;
};

export const createEmployee = async (employeeData) => {
  const response = await axiosInstance.post(
    "/employees",
    {
      employeeData: employeeData,
    },
    {
      withCredentials: true,
    },
  );
};

export const updateEmployee = async (id, employeeData) => {
  const response = await axiosInstance.put(
    `/employees/${id}`,
    {
      employeeData: employeeData,
    },
    {
      withCredentials: true,
    },
  );
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axiosInstance.delete(`/employees/${id}`, {
      withCredentials: true,
    });
    console.log("Ответ при удалении:", response);
    return response;
  } catch (error) {
    console.error("Ошибка при удалении сотрудника:", error);
    throw error;
  }
};
