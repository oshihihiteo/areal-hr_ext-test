import axiosInstance from "../instances/baseURL.js";

export const LoginUser = async (login, password) => {
    const response = await axiosInstance.post(
        "/auth",
        { login, password },
        { withCredentials: true }
    );
    return response.data;
};
