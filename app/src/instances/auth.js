import axiosInstance from "../instances/baseURL.js";

export const LoginUser = async (login, password) => {
    const response = await axiosInstance.post(
        "/auth",
        { login, password }, // передаем данные сразу объектом
        { withCredentials: true } // вот так передаем credentials
    );
    return response.data;
};
