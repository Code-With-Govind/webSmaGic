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

  /**
   * Fetch persistent inquiries list (Founders Portal)
   * @param {Object} [filters]
   * @param {string} [filters.status]
   * @param {string} [filters.search]
   * @param {number} [filters.page]
   * @param {number} [filters.limit]
   * @returns {Promise<Object>}
   */
  async getInquiriesList(filters = {}) {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const queryString = params.toString() ? `?${params.toString()}` : '';

    const response = await fetch(`${API_BASE_URL}/inquiries${queryString}`, {
      headers: { Accept: 'application/json' },
      credentials: 'include', // Transmit HTTP-only founder token cookie
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(data?.message || 'Failed to retrieve inquiries list.');
      error.status = response.status;
      throw error;
    }

    return data;
  },

  /**
   * Update inquiry workflow status
   * @param {string} id
   * @param {string} status ('new'|'contacted'|'in-progress'|'completed'|'rejected')
   * @returns {Promise<Object>}
   */
  async updateStatus(id, status) {
    const response = await fetch(`${API_BASE_URL}/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(data?.message || 'Failed to update inquiry status.');
      error.status = response.status;
      throw error;
    }

    return data;
  },
};

export default inquiryService;

