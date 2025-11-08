import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getProducts = (filters = {}) => {
  const params = new URLSearchParams(filters);
  return axios.get(`${API_BASE_URL}/products?${params}`);
};

export const getProduct = (id) => {
  return axios.get(`${API_BASE_URL}/products/${id}`);
};

export const getLatestProducts = () => {
  return axios.get(`${API_BASE_URL}/products/latest/all`);
};

export const getCategories = () => {
  return axios.get(`${API_BASE_URL}/categories`);
};

export const getCategory = (id) => {
  return axios.get(`${API_BASE_URL}/categories/${id}`);
};

export const getCart = (sessionId) => {
  return axios.get(`${API_BASE_URL}/cart/${sessionId}`);
};

export const addToCart = (sessionId, productId, quantity = 1) => {
  return axios.post(`${API_BASE_URL}/cart`, { sessionId, productId, quantity });
};

export const updateCartItem = (id, quantity) => {
  return axios.put(`${API_BASE_URL}/cart/${id}`, { quantity });
};

export const removeFromCart = (id) => {
  return axios.delete(`${API_BASE_URL}/cart/${id}`);
};

export const clearCart = (sessionId) => {
  return axios.delete(`${API_BASE_URL}/cart/session/${sessionId}`);
};

export const createOrder = (orderData) => {
  return axios.post(`${API_BASE_URL}/orders`, orderData);
};

export const getOrder = (orderNumber) => {
  return axios.get(`${API_BASE_URL}/orders/${orderNumber}`);
};

export const submitContactForm = (formData) => {
  return axios.post(`${API_BASE_URL}/contact`, formData);
};

// Helper to get or create session ID
export const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};
