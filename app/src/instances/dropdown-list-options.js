import axiosInstance from '../instances/baseURL.js';

export const getDepartmentsNames = async () => {
    const response = await axiosInstance.get('/options/departments');
    return response.data.departments;
};

export const getPositionsNames = async () => {
    const response = await axiosInstance.get('/options/positions');
    return response.data.positions;
};

export const getOrganizationsNames = async () => {
    const response = await axiosInstance.get('/options/organizations');
    return response.data.organizations;
};

export const getActionsNames = async () => {
    const response = await axiosInstance.get('/options/actions');
    return response.data.actions;
};

export const getEmployeesWithDepartmentsAndPositions = async () => {
    const response = await axiosInstance.get('/options/employees');
    return response.data.employeesWithDepartmentsAndPositions;
};
