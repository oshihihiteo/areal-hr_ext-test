import axiosInstance from "../instances/baseURL.js";

export const loginUser = async (login, password) => {
    const response = await axiosInstance.post(
        "/auth",
        { login, password },
        { withCredentials: true }
    );
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axiosInstance.get(
        "/auth/me",
        { withCredentials: true }
    );
    return response.data;
};
