import axiosInstance from '../instances/baseURL.js';

export const getActions = async () => {
    const response = await axiosInstance.get('/actions');
    return response.data.actions;
};
