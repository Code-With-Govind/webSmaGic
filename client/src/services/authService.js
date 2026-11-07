import { API_BASE_URL, setAuthToken, getAuthHeaders } from './api';

export const authService = {
  /**
   * Log in founder account
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include', // Transmit & receive HTTP-only cookies
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const error = new Error(data?.message || 'Login failed. Please check credentials.');
      error.status = res.status;
      throw error;
    }

    if (data?.data?.token) {
      setAuthToken(data.data.token);
    }

    return data;
  },

  /**
   * Terminate founder session
   */
  async logout() {
    setAuthToken(null);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        credentials: 'include',
      });
      return await res.json().catch(() => null);
    } catch {
      return { success: true };
    }
  },

  /**
   * Check currently authenticated founder session
   */
  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Accept: 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'include',
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const error = new Error(data?.message || 'Session not authenticated.');
      error.status = res.status;
      throw error;
    }

    return data;
  },
};

export default authService;

