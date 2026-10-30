import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  recordEvent,
  getOverview,
  getTraffic,
  getPages,
  getSources,
  getServices,
  getInquiries,
} from '../controllers/analyticsController.js';
import { validateAnalyticsEvent } from '../middleware/validateAnalyticsEvent.js';
import { devDashboardAuth } from '../middleware/devDashboardAuth.js';

const router = Router();

// Public Event Ingestion Rate Limiter: 100 events per 15 minutes per IP
const eventRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Rate limit exceeded for analytics telemetry.',
  },
});

// 1. PUBLIC INGESTION ENDPOINT
router.post('/events', eventRateLimiter, validateAnalyticsEvent, recordEvent);

// 2. PRIVATE DASHBOARD AGGREGATION ENDPOINTS (Guarded by devDashboardAuth)
router.get('/overview', devDashboardAuth, getOverview);
router.get('/traffic', devDashboardAuth, getTraffic);
router.get('/top-pages', devDashboardAuth, getPages);
router.get('/sources', devDashboardAuth, getSources);
router.get('/services', devDashboardAuth, getServices);
router.get('/inquiries', devDashboardAuth, getInquiries);

export default router;
