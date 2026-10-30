import { API_BASE_URL } from './api';

export const dashboardService = {
  /**
   * Fetch complete dashboard dataset in parallel
   */
  async getDashboardData(period = '7d') {
    const query = `?period=${encodeURIComponent(period)}`;

    const [overviewRes, trafficRes, pagesRes, sourcesRes, servicesRes, inquiriesRes] =
      await Promise.all([
        fetch(`${API_BASE_URL}/analytics/overview${query}`),
        fetch(`${API_BASE_URL}/analytics/traffic${query}`),
        fetch(`${API_BASE_URL}/analytics/top-pages${query}`),
        fetch(`${API_BASE_URL}/analytics/sources${query}`),
        fetch(`${API_BASE_URL}/analytics/services${query}`),
        fetch(`${API_BASE_URL}/analytics/inquiries${query}`),
      ]);

    // Check if access is forbidden (production lockdown guard)
    if (overviewRes.status === 403) {
      const err = new Error(
        'Dashboard analytics endpoints are locked pending Phase 5 Founder Authentication & Security.'
      );
      err.status = 403;
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
