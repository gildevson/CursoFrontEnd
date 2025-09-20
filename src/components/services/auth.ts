// mock simples — troque pela sua API real quando quiser
export async function loginApi(email: string, password: string) {
  if (email === 'admin@demo.com' && password === '123456') {
    return { token: 'fake-token', user: { id: '1', name: 'Admin Demo', email } };
  }
  throw new Error('Credenciais inválidas');
}
