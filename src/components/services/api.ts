export const api = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',

  async get<T>(path: string, token?: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'include', // opcional se usar cookies
    });
    if (!res.ok) throw new Error(await safeText(res));
    return res.json();
  },

  async post<T>(path: string, body?: unknown, token?: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body ?? {}),
      credentials: 'include', // opcional se usar cookies
    });
    if (!res.ok) throw new Error(await safeText(res));
    return res.json();
  },
};

async function safeText(res: Response) {
  try { return await res.text(); } catch { return 'Erro na requisição'; }
}
