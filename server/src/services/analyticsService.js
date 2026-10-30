import AnalyticsEvent from '../models/AnalyticsEvent.js';
import Inquiry from '../models/Inquiry.js';

/**
 * Helper to parse and validate date range from query parameters
 */
export const parseDateRange = (query) => {
  const now = new Date();
  let startDate;
  let endDate = new Date(now.getTime());

  const period = query.period || '7d';

  if (query.startDate && query.endDate) {
    const customStart = new Date(query.startDate);
    const customEnd = new Date(query.endDate);

    if (!isNaN(customStart.getTime()) && !isNaN(customEnd.getTime())) {
      startDate = customStart;
      endDate = customEnd;
      // Set endDate to end of the day if it lacks time
      if (!query.endDate.includes('T')) {
        endDate.setHours(23, 59, 59, 999);
      }
    }
  }

  if (!startDate) {
    startDate = new Date(now.getTime());
    if (period === '30d') {
      startDate.setDate(now.getDate() - 30);
    } else if (period === '90d') {
      startDate.setDate(now.getDate() - 90);
    } else {
      // Default: 7 days
      startDate.setDate(now.getDate() - 7);
    }
    startDate.setHours(0, 0, 0, 0);
  }

  return { startDate, endDate, period };
};

/**
 * Overview KPIs Aggregation
 */
export const getOverviewMetrics = async (startDate, endDate) => {
  const matchFilter = {
    timestamp: { $gte: startDate, $lte: endDate },
  };

  const [analyticsStats, totalInquiriesCount, inquiryAttemptsCount, serviceCtaClicksCount] =
    await Promise.all([
      AnalyticsEvent.aggregate([
        { $match: { ...matchFilter, eventType: 'page_view' } },
        {
          $group: {
            _id: null,
            pageViews: { $sum: 1 },
            uniqueVisitors: { $addToSet: '$visitorId' },
            uniqueSessions: { $addToSet: '$sessionId' },
          },
        },
      ]),
      Inquiry.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
      }),
      AnalyticsEvent.countDocuments({
        ...matchFilter,
        eventType: 'inquiry_attempt',
      }),
      AnalyticsEvent.countDocuments({
        ...matchFilter,
        eventType: 'service_cta_click',
      }),
    ]);

  const stats = analyticsStats[0] || {
    pageViews: 0,
    uniqueVisitors: [],
    uniqueSessions: [],
  };

  const totalVisitors = Array.isArray(stats.uniqueVisitors) ? stats.uniqueVisitors.length : 0;
  const totalSessions = Array.isArray(stats.uniqueSessions) ? stats.uniqueSessions.length : 0;
  const totalPageViews = stats.pageViews || 0;

  // Conversion Rate = (Successful Inquiries / Unique Visitors) * 100
  const conversionRate =
    totalVisitors > 0
      ? Number(((totalInquiriesCount / totalVisitors) * 100).toFixed(2))
      : null;

  return {
    totalVisitors,
    totalSessions,
    totalPageViews,
    totalInquiries: totalInquiriesCount,
    inquiryAttempts: inquiryAttemptsCount,
    serviceCtaClicks: serviceCtaClicksCount,
    conversionRate,
    timeframe: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
  };
};

/**
 * Daily Traffic Trend Aggregation
 */
export const getTrafficTrend = async (startDate, endDate) => {
  const matchFilter = {
    timestamp: { $gte: startDate, $lte: endDate },
    eventType: 'page_view',
  };

  const rawTrend = await AnalyticsEvent.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
        },
        pageViews: { $sum: 1 },
        visitors: { $addToSet: '$visitorId' },
        sessions: { $addToSet: '$sessionId' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Convert to formatted array
  const trendMap = new Map();
  rawTrend.forEach((item) => {
    trendMap.set(item._id, {
      date: item._id,
      pageViews: item.pageViews,
      visitors: item.visitors ? item.visitors.length : 0,
      sessions: item.sessions ? item.sessions.length : 0,
    });
  });

  // Fill in zero days across the date range for clean charting
  const result = [];
  const curr = new Date(startDate);
  while (curr <= endDate) {
    const dateStr = curr.toISOString().split('T')[0];
    result.push(
      trendMap.get(dateStr) || {
        date: dateStr,
        pageViews: 0,
        visitors: 0,
        sessions: 0,
      }
    );
    curr.setDate(curr.getDate() + 1);
  }

  return result;
};

/**
 * Top Pages Aggregation
 */
export const getTopPages = async (startDate, endDate, limit = 10) => {
  const matchFilter = {
    timestamp: { $gte: startDate, $lte: endDate },
    eventType: 'page_view',
  };

  const pages = await AnalyticsEvent.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: '$pagePath',
        views: { $sum: 1 },
        visitors: { $addToSet: '$visitorId' },
      },
    },
    {
      $project: {
        _id: 0,
        pagePath: '$_id',
        views: 1,
        uniqueVisitors: { $size: '$visitors' },
      },
    },
    { $sort: { views: -1 } },
    { $limit: limit },
  ]);

  return pages;
};

/**
 * Traffic Sources Aggregation
 */
export const getTrafficSources = async (startDate, endDate) => {
  const matchFilter = {
    timestamp: { $gte: startDate, $lte: endDate },
    eventType: 'page_view',
  };

  const sources = await AnalyticsEvent.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: { $ifNull: ['$source', 'direct'] },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        source: '$_id',
        count: 1,
      },
    },
    { $sort: { count: -1 } },
  ]);

  const total = sources.reduce((acc, curr) => acc + curr.count, 0);

  return sources.map((s) => ({
    ...s,
    percentage: total > 0 ? Number(((s.count / total) * 100).toFixed(1)) : 0,
  }));
};

/**
 * Service Insights Aggregation
 */
export const getServiceInsights = async (startDate, endDate) => {
  const [ctaClicks, inquiriesByService] = await Promise.all([
    AnalyticsEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate, $lte: endDate },
          eventType: 'service_cta_click',
          service: { $ne: '' },
        },
      },
      {
        $group: {
          _id: '$service',
          clicks: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          service: '$_id',
          clicks: 1,
        },
      },
      { $sort: { clicks: -1 } },
    ]),
    Inquiry.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$service',
          inquiries: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          service: '$_id',
          inquiries: 1,
        },
      },
      { $sort: { inquiries: -1 } },
    ]),
  ]);

  // Combine clicks and inquiries by service
  const combinedMap = new Map();

  ctaClicks.forEach((c) => {
    combinedMap.set(c.service, { service: c.service, ctaClicks: c.clicks, inquiries: 0 });
  });

  inquiriesByService.forEach((i) => {
    if (combinedMap.has(i.service)) {
      combinedMap.get(i.service).inquiries = i.inquiries;
    } else {
      combinedMap.set(i.service, { service: i.service, ctaClicks: 0, inquiries: i.inquiries });
    }
  });

  return Array.from(combinedMap.values()).sort(
    (a, b) => b.inquiries + b.ctaClicks - (a.inquiries + a.ctaClicks)
  );
};

/**
 * Inquiry Status & Demographic Breakdown
 */
export const getInquiryAnalytics = async (startDate, endDate) => {
  const matchFilter = {
    createdAt: { $gte: startDate, $lte: endDate },
  };

  const [byStatus, byContactMethod, totalInquiries] = await Promise.all([
    Inquiry.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          count: 1,
        },
      },
    ]),
    Inquiry.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$preferredContactMethod',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          method: '$_id',
          count: 1,
        },
      },
    ]),
    Inquiry.countDocuments(matchFilter),
  ]);

  // Ensure all standard statuses are represented
  const statusCounts = {
    new: 0,
    contacted: 0,
    'in-progress': 0,
    completed: 0,
    rejected: 0,
  };

  byStatus.forEach((item) => {
    if (item.status && statusCounts[item.status] !== undefined) {
      statusCounts[item.status] = item.count;
    }
  });

  return {
    total: totalInquiries,
    byStatus: statusCounts,
    byContactMethod,
  };
};
