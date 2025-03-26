import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/api/posts`);
  return response.data;
};

export const fetchCategoryPosts = async (category) => {
  const response = await axios.get(`${API_URL}/api/posts?category=${category}`);
  return response.data;
};

export const subscribeNewsletter = async (email) => {
  const response = await axios.post(`${API_URL}/api/newsletter/subscribe`, { email });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  return response.data.token;
};

export const createPost = async (postData, token) => {
  const response = await axios.post(`${API_URL}/api/posts`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updatePost = async (slug, postData, token) => {
  const response = await axios.put(`${API_URL}/api/posts/${slug}`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deletePost = async (slug, token) => {
  const response = await axios.delete(`${API_URL}/api/posts/${slug}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchComments = async (token) => {
  const response = await axios.get(`${API_URL}/api/comments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const approveComment = async (id, token) => {
  const response = await axios.put(`${API_URL}/api/comments/${id}/approve`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteComment = async (id, token) => {
  const response = await axios.delete(`${API_URL}/api/comments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchSubscribers = async (token) => {
  const response = await axios.get(`${API_URL}/api/newsletter/subscribers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchGuestPosts = async (token) => {
  const response = await axios.get(`${API_URL}/api/guest-posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateGuestPost = async (id, status, token) => {
  const response = await axios.put(`${API_URL}/api/guest-posts/${id}`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const uploadImage = async (formData, token) => {
  const response = await axios.post(`${API_URL}/api/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.imageUrl;
};

// Post Page APIs
export const fetchPost = async (slug) => {
  const response = await axios.get(`${API_URL}/api/posts/${slug}`);
  return response.data;
};

export const likePost = async (slug) => {
  const response = await axios.post(`${API_URL}/api/posts/${slug}/like`);
  return response.data;
};

export const createComment = async (commentData) => {
  const response = await axios.post(`${API_URL}/api/comments`, commentData);
  return response.data;
};

export const fetchPostComments = async (postId) => {
  const response = await axios.get(`${API_URL}/api/comments/${postId}`);
  return response.data;
};