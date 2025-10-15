
import apiClient from './api';

export const servicesAPI = {
  // Get all active services
  getActive: async () => {
    const response = await apiClient.get('/services/active/');
    return response.data;
  },

  // Get featured services
  getFeatured: async () => {
    const response = await apiClient.get('/services/featured/');
    return response.data;
  },

  // Get single service by ID
  getById: async (id) => {
    const response = await apiClient.get(`/services/${id}/`);
    return response.data;
  },

  // Get all services with filters
  getAll: async (params = {}) => {
    const response = await apiClient.get('/services/', { params });
    return response.data;
  },
};
