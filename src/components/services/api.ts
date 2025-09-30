// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8787", // ou 127.0.0.1:8787
});

// Interceptor: adiciona token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
