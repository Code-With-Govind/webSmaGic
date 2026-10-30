import AnalyticsEvent from '../models/AnalyticsEvent.js';
import { isDBConnected } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import {
  parseDateRange,
  getOverviewMetrics,
  getTrafficTrend,
  getTopPages,
  getTrafficSources,
  getServiceInsights,
  getInquiryAnalytics,
} from '../services/analyticsService.js';

/**
 * @desc    Record a single client analytics event
 * @route   POST /api/analytics/events
 * @access  Public
 */
export const recordEvent = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      // Return 202 accepted so client tracker never throws or retries in a loop
      return sendSuccess(res, 202, 'Analytics received; persistent storage currently offline.');
    }

    await AnalyticsEvent.create(req.cleanEvent);

    return sendSuccess(res, 201, 'Analytics event recorded.');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get dashboard overview KPIs
 * @route   GET /api/analytics/overview
 * @access  Private / Development Only
 */
export const getOverview = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      return sendSuccess(res, 200, 'Database offline; empty overview returned.', {
        totalVisitors: 0,
        totalSessions: 0,
        totalPageViews: 0,
        totalInquiries: 0,
        inquiryAttempts: 0,
        serviceCtaClicks: 0,
        conversionRate: null,
        dbStatus: 'disconnected',
      });
    }

    const { startDate, endDate, period } = parseDateRange(req.query);
    const data = await getOverviewMetrics(startDate, endDate);

    return sendSuccess(res, 200, 'Overview metrics retrieved successfully.', {
      ...data,
      period,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get daily traffic trends
 * @route   GET /api/analytics/traffic
 * @access  Private / Development Only
 */
export const getTraffic = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      return sendSuccess(res, 200, 'Database offline; empty traffic trend returned.', []);
    }

    const { startDate, endDate, period } = parseDateRange(req.query);
    const trend = await getTrafficTrend(startDate, endDate);

    return sendSuccess(res, 200, 'Traffic trends retrieved successfully.', trend);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get top visited pages
 * @route   GET /api/analytics/top-pages
 * @access  Private / Development Only
 */
export const getPages = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      return sendSuccess(res, 200, 'Database offline; empty top pages returned.', []);
    }

    const { startDate, endDate } = parseDateRange(req.query);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);
    const pages = await getTopPages(startDate, endDate, limit);

    return sendSuccess(res, 200, 'Top pages retrieved successfully.', pages);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get traffic sources distribution
 * @route   GET /api/analytics/sources
 * @access  Private / Development Only
 */
export const getSources = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      return sendSuccess(res, 200, 'Database offline; empty sources returned.', []);
    }

    const { startDate, endDate } = parseDateRange(req.query);
    const sources = await getTrafficSources(startDate, endDate);

    return sendSuccess(res, 200, 'Traffic sources retrieved successfully.', sources);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get service CTA clicks & inquiries
 * @route   GET /api/analytics/services
 * @access  Private / Development Only
 */
export const getServices = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      return sendSuccess(res, 200, 'Database offline; empty service insights returned.', []);
    }

    const { startDate, endDate } = parseDateRange(req.query);
    const services = await getServiceInsights(startDate, endDate);

    return sendSuccess(res, 200, 'Service insights retrieved successfully.', services);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get inquiry analytics & status distribution
 * @route   GET /api/analytics/inquiries
 * @access  Private / Development Only
 */
export const getInquiries = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      return sendSuccess(res, 200, 'Database offline; empty inquiry breakdown returned.', {
        total: 0,
        byStatus: { new: 0, contacted: 0, 'in-progress': 0, completed: 0, rejected: 0 },
        byContactMethod: [],
      });
    }

    const { startDate, endDate } = parseDateRange(req.query);
    const analytics = await getInquiryAnalytics(startDate, endDate);

    return sendSuccess(res, 200, 'Inquiry metrics retrieved successfully.', analytics);
  } catch (error) {
    next(error);
  }
};
