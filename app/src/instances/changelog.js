import axiosInstance from '../instances/baseURL.js';

export const getChangelog = async () => {
    const response = await axiosInstance.get('/changelog');
    return response.data.changelog;
};
