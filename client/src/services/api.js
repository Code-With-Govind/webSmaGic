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

export default API_BASE_URL;
