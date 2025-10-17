import apiClient from './api';

export const blogAPI = {
  // ✅ Get all blog posts (optionally with filters like category, search, etc.)
  getAll: async (params = {}) => {
    const response = await apiClient.get('/blogs/', { params });
    return response.data;
  },

  // ✅ Get a single blog post by ID
  getById: async (id) => {
    const response = await apiClient.get(`/blogs/${id}/`);
    return response.data;
  },

  // ✅ Get blogs filtered by category
  getByCategory: async (categoryId) => {
    const response = await apiClient.get(`/blogs/category/${categoryId}/`);
    return response.data;
  },

  // ✅ Get featured blogs (if your backend supports it)
  getFeatured: async () => {
    const response = await apiClient.get('/blogs/featured/');
    return response.data;
  },

  // ✅ Get recent blogs
  getRecent: async () => {
    const response = await apiClient.get('/blogs/recent/');
    return response.data;
  },

  // ✅ Create a new blog post (for admin/editor use)
  create: async (blogData) => {
    const response = await apiClient.post('/blogs/', blogData);
    return response.data;
  },

  // ✅ Update an existing blog post
  update: async (id, blogData) => {
    const response = await apiClient.put(`/blogs/${id}/`, blogData);
    return response.data;
  },

  // ✅ Delete a blog post
  delete: async (id) => {
    const response = await apiClient.delete(`/blogs/${id}/`);
    return response.data;
  },
};
