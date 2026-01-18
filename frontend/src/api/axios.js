// src/utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // change if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;




/* utils/axiosInstance.js
import axios from "axios";

const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // backend base
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;*/