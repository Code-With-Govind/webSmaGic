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
import { requireFounderAuth } from '../middleware/requireFounderAuth.js';

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

// 2. PRIVATE DASHBOARD AGGREGATION ENDPOINTS (Protected by requireFounderAuth)
router.get('/overview', requireFounderAuth, getOverview);
router.get('/traffic', requireFounderAuth, getTraffic);
router.get('/top-pages', requireFounderAuth, getPages);
router.get('/sources', requireFounderAuth, getSources);
router.get('/services', requireFounderAuth, getServices);
router.get('/inquiries', requireFounderAuth, getInquiries);

export default router;
