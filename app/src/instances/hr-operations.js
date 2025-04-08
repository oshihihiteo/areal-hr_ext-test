import axiosInstance from '../instances/baseURL.js';

export const getHrOperations = async () => {
    const response = await axiosInstance.get('/hr-operations');
    return response.data.hr_operations;
};

export const createHrOperation = async (hrOperationData) => {
    const response = await axiosInstance.post('/hr-operations', {hrOperationData: hrOperationData});
};

export const updateHrOperation = async (id, hrOperationData) => {
    const response = await axiosInstance.put(`/hr-operations/${id}`, {hrOperationData: hrOperationData});
};

export const deleteHrOperation = async (id) => {
    const response = await axiosInstance.delete(`/hr-operations/${id}`);
};
