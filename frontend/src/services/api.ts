import axios from 'axios';

// ============================================================
// Instância Axios configurada
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// ─── Request Interceptor ─────────────────────────────────────
// Injeta o token JWT em todas as requisições autenticadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@lua:accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────
// Trata 401 (token expirado) e limpa a sessão
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Limpa dados da sessão e redireciona para login
      localStorage.removeItem('@lua:accessToken');
      localStorage.removeItem('@lua:user');
      window.location.href = '/login';
    }

    // Formata a mensagem de erro para uso nos componentes
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Erro desconhecido';

    return Promise.reject(new Error(message));
  }
);

export default api;
