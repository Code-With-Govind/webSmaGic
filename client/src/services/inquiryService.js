import { API_BASE_URL } from './api';

/**
 * Service to handle customer inquiries
 */
export const inquiryService = {
  /**
   * Submit a new project inquiry
   * @param {Object} inquiryData
   * @returns {Promise<Object>} API response data
   */
  async submitInquiry(inquiryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const error = new Error(
          data?.message || 'Failed to submit inquiry. Please try again later.'
        );
        error.status = response.status;
        error.errors = data?.errors || [];
        throw error;
      }

      return data;
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        const networkError = new Error(
          'Unable to reach the server. Please verify your internet connection or try again shortly.'
        );
        networkError.status = 0;
        throw networkError;
      }
      throw err;
    }
  },

  /**
   * Check backend API health status
   * @returns {Promise<Object>}
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        headers: { Accept: 'application/json' },
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable', error: err.message };
    }
  },
};

export default inquiryService;
