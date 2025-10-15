
import apiClient from './api';

export const contactAPI = {
  // Submit contact form (Public endpoint)
  submitMessage: async (data) => {
    const response = await apiClient.post('/contact/', data);
    return response.data;
  },

  // Get all contact messages (Admin only)
  getAll: async (params = {}) => {
    const response = await apiClient.get('/contact/', { params });
    return response.data;
  },

  // Get single message by ID (Admin only)
  getById: async (id) => {
    const response = await apiClient.get(`/contact/${id}/`);
    return response.data;
  },

  // Mark message as read (Admin only)
  markAsRead: async (id) => {
    const response = await apiClient.post(`/contact/${id}/mark_read/`);
    return response.data;
  },

  // Send reply to message (Admin only)
  sendReply: async (id, replyData) => {
    const response = await apiClient.post(`/contact/${id}/reply/`, replyData);
    return response.data;
  },

  // Get contact statistics (Admin only)
  getStats: async () => {
    const response = await apiClient.get('/contact/stats/');
    return response.data;
  },

  // Get unread messages (Admin only)
  getUnread: async () => {
    const response = await apiClient.get('/contact/unread/');
    return response.data;
  },
};