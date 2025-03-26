import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getCategories = () => api.get('/categories');
export const getCategoryBySlug = (slug) => api.get(`/categories/${slug}`);
export const getPosts = (page) => api.get(`/posts?page=${page}`);

export default api;