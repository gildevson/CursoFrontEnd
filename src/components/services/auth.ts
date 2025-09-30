// src/services/auth.ts
import api from './api';

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
}
