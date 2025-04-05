import axiosInstance from '../instances/baseURL.js';

export const getPositions = async () => {
    const response = await axiosInstance.get('/positions');
    return response.data.positions;
};

export const createPosition = async (positionData) => {
    const response = await axiosInstance.post('/positions', {positionData: positionData});
};

export const updatePosition = async (id, positionData) => {
    const response = await axiosInstance.put(`/positions/${id}`, {positionData: positionData});
};

export const deletePosition = async (id) => {
    const response = await axiosInstance.delete(`/positions/${id}`);
};
