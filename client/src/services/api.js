/**
 * Global API Base URL Configuration
 */
const defaultProductionUrl = 'https://websmagic-backend.onrender.com';
const defaultDevelopmentUrl = 'http://localhost:5000';

const isProduction = import.meta.env.PROD || import.meta.env.MODE === 'production';
const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (isProduction ? defaultProductionUrl : defaultDevelopmentUrl);

// Ensure standard /api prefix
export const API_BASE_URL = rawBaseUrl.endsWith('/api')
  ? rawBaseUrl
  : `${rawBaseUrl.replace(/\/$/, '')}/api`;

const TOKEN_STORAGE_KEY = 'websmagic_founder_token';

/**
 * Retrieve saved founder token for cross-domain Bearer authorization
 */
export const getAuthToken = () => {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
  } catch {
    return '';
  }
};

/**
 * Persist or clear founder token
 */
export const setAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore storage quota / restricted storage exceptions
  }
};

/**
 * Common authorization headers generator
 */
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default API_BASE_URL;
