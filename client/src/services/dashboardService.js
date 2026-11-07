import { API_BASE_URL, getAuthHeaders } from './api';

export const dashboardService = {
  /**
   * Fetch complete dashboard dataset in parallel with credentials
   */
  async getDashboardData(period = '7d') {
    const query = `?period=${encodeURIComponent(period)}`;
    const fetchOptions = {
      headers: {
        Accept: 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'include', // Transmit HTTP-only founder session cookie
    };

    const [overviewRes, trafficRes, pagesRes, sourcesRes, servicesRes, inquiriesRes] =
      await Promise.all([
        fetch(`${API_BASE_URL}/analytics/overview${query}`, fetchOptions),
        fetch(`${API_BASE_URL}/analytics/traffic${query}`, fetchOptions),
        fetch(`${API_BASE_URL}/analytics/top-pages${query}`, fetchOptions),
        fetch(`${API_BASE_URL}/analytics/sources${query}`, fetchOptions),
        fetch(`${API_BASE_URL}/analytics/services${query}`, fetchOptions),
        fetch(`${API_BASE_URL}/analytics/inquiries${query}`, fetchOptions),
      ]);

    // Check if session is unauthenticated / expired
    if (overviewRes.status === 401) {
      const err = new Error('Authentication required. Session expired or invalid.');
      err.status = 401;
      throw err;
    }

    if (!overviewRes.ok) {
      const err = new Error('Failed to retrieve analytics overview metrics.');
      err.status = overviewRes.status;
      throw err;
    }

    const [overview, traffic, pages, sources, services, inquiries] = await Promise.all([
      overviewRes.json(),
      trafficRes.json(),
      pagesRes.json(),
      sourcesRes.json(),
      servicesRes.json(),
      inquiriesRes.json(),
    ]);

    return {
      overview: overview.data || {},
      traffic: traffic.data || [],
      pages: pages.data || [],
      sources: sources.data || [],
      services: services.data || [],
      inquiries: inquiries.data || { total: 0, byStatus: {}, byContactMethod: [] },
    };
  },
};

export default dashboardService;
