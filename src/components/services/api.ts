// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8787',
  withCredentials: true, // se for usar cookies, senão pode remover
});

export default api;
