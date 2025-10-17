import apiClient from './api';

export const portfolioAPI = {
    // ✅ Get all portfolio projects (Public)
    getAll: async (params = {}) => {
        const response = await apiClient.get('/portfolio/', { params });
        return response.data;
    },

    // ✅ Get single project details (Public)
    getById: async (id) => {
        const response = await apiClient.get(`/portfolio/${id}/`);
        return response.data;
    },

    // ✅ Add new project (Admin only)
    create: async (data) => {
        const response = await apiClient.post('/portfolio/', data, {
            headers: { 'Content-Type': 'multipart/form-data' }, // supports images
        });
        return response.data;
    },

    // ✅ Update existing project (Admin only)
    update: async (id, data) => {
        const response = await apiClient.put(`/portfolio/${id}/`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    // ✅ Delete a project (Admin only)
    delete: async (id) => {
        const response = await apiClient.delete(`/portfolio/${id}/`);
        return response.data;
    },

    // ✅ Publish/unpublish project (Admin only)
    togglePublish: async (id) => {
        const response = await apiClient.post(`/portfolio/${id}/toggle_publish/`);
        return response.data;
    },

    // ✅ Get featured projects (Public)
    getFeatured: async () => {
        const response = await apiClient.get('/portfolio/featured/');
        return response.data;
    },

    // ✅ Get portfolio statistics (Admin only)
    getStats: async () => {
        const response = await apiClient.get('/portfolio/stats/');
        return response.data;
    },
};
