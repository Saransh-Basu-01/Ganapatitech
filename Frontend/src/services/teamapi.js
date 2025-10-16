import apiClient from './api';

export const teamAPI = {
  // Get all team members
  getAll: async (params = {}) => {
    const response = await apiClient.get('/teams/', { params });
    return response.data;
  },

  // Get a single team member by ID
  getById: async (id) => {
    const response = await apiClient.get(`/teams/${id}/`);
    return response.data;
  },

  // (Optional) Get featured or active team members — if your backend supports them
  getActive: async () => {
    const response = await apiClient.get('/teams/active/');
    return response.data;
  },

  getFeatured: async () => {
    const response = await apiClient.get('/teams/featured/');
    return response.data;
  },
};
