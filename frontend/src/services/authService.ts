import api from './api';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
} from '@/types';

// ============================================================
// Auth Service — gerencia login, registro e sessão
// ============================================================

const TOKEN_KEY = '@lua:accessToken';
const USER_KEY = '@lua:user';

export const authService = {
  /**
   * Autentica o usuário e persiste tokens + dados no localStorage
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    authService.saveSession(data);
    return data;
  },

  /**
   * Cadastra novo usuário
   */
  async register(payload: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    authService.saveSession(data);
    return data;
  },

  /**
   * Busca o perfil atualizado do usuário autenticado
   */
  async getProfile(): Promise<User> {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },

  /**
   * Encerra a sessão local (sem chamada ao backend)
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Persiste tokens e usuário no localStorage
   */
  saveSession(auth: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, auth.tokens.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
  },

  /**
   * Recupera o token armazenado
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Recupera o usuário armazenado (sem chamada ao backend)
   */
  getStoredUser(): User | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  },

  /**
   * Verifica se há uma sessão ativa
   */
  isAuthenticated(): boolean {
    return !!authService.getToken();
  },
};
