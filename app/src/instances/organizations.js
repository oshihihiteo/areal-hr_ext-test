import axiosInstance from "../instances/baseURL.js";

export const getOrganizations = async () => {
  const response = await axiosInstance.get("/organizations", {
    withCredentials: true,
  });
  return response.data.organizations;
};

export const createOrganization = async (organizationData) => {
  const response = await axiosInstance.post(
    "/organizations",
    {
      organizationData: organizationData,
    },
    {
      withCredentials: true,
    },
  );
};

export const updateOrganization = async (id, organizationData) => {
  const response = await axiosInstance.put(
    `/organizations/${id}`,
    {
      organizationData: organizationData,
    },
    {
      withCredentials: true,
    },
  );
};

export const deleteOrganization = async (id) => {
  const response = await axiosInstance.delete(`/organizations/${id}`, {
    withCredentials: true,
  });
};
