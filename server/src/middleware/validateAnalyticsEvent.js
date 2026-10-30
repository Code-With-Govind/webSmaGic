import { sendError } from '../utils/apiResponse.js';

const ALLOWED_EVENT_TYPES = [
  'page_view',
  'service_cta_click',
  'inquiry_attempt',
  'inquiry_success',
];

const ID_REGEX = /^[a-zA-Z0-9_-]{8,64}$/;

// Strip potential HTML/script tags
const sanitizeString = (str, maxLen = 255) => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim().substring(0, maxLen);
};

export const validateAnalyticsEvent = (req, res, next) => {
  const body = req.body || {};
  const errors = [];

  const eventType = typeof body.eventType === 'string' ? body.eventType.trim() : '';
  const visitorId = typeof body.visitorId === 'string' ? body.visitorId.trim() : '';
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim() : '';
  let pagePath = typeof body.pagePath === 'string' ? body.pagePath.trim() : '';

  // 1. Event Type Validation
  if (!eventType) {
    errors.push({ field: 'eventType', message: 'Event type is required.' });
  } else if (!ALLOWED_EVENT_TYPES.includes(eventType)) {
    errors.push({ field: 'eventType', message: `Invalid event type. Must be one of: ${ALLOWED_EVENT_TYPES.join(', ')}` });
  }

  // 2. Visitor ID Validation
  if (!visitorId) {
    errors.push({ field: 'visitorId', message: 'Visitor ID is required.' });
  } else if (!ID_REGEX.test(visitorId)) {
    errors.push({ field: 'visitorId', message: 'Visitor ID must be alphanumeric and between 8 and 64 characters.' });
  }

  // 3. Session ID Validation
  if (!sessionId) {
    errors.push({ field: 'sessionId', message: 'Session ID is required.' });
  } else if (!ID_REGEX.test(sessionId)) {
    errors.push({ field: 'sessionId', message: 'Session ID must be alphanumeric and between 8 and 64 characters.' });
  }

  // 4. Page Path Validation (must be relative path, not empty, starting with '/')
  if (!pagePath) {
    errors.push({ field: 'pagePath', message: 'Page path is required.' });
  } else {
    // Sanitize path, remove domain or sensitive query parameters if included
    try {
      if (pagePath.startsWith('http://') || pagePath.startsWith('https://')) {
        const parsed = new URL(pagePath);
        pagePath = parsed.pathname;
      }
    } catch {
      // Keep original path if parsing fails
    }

    if (!pagePath.startsWith('/')) {
      pagePath = `/${pagePath}`;
    }

    pagePath = sanitizeString(pagePath, 255);

    // Privacy rule: Exclude private dashboard navigation from public analytics collection
    if (pagePath.startsWith('/dashboard')) {
      return sendError(res, 400, 'Internal dashboard paths are excluded from analytics collection.');
    }
  }

  if (errors.length > 0) {
    return sendError(res, 400, 'Invalid analytics event payload.', errors);
  }

  // Sanitize contextual fields (no PII, safe string limits)
  req.cleanEvent = {
    eventType,
    visitorId,
    sessionId,
    pagePath,
    referrer: sanitizeString(body.referrer || '', 500),
    source: sanitizeString(body.source || 'direct', 100).toLowerCase(),
    medium: sanitizeString(body.medium || '', 100).toLowerCase(),
    campaign: sanitizeString(body.campaign || '', 100),
    service: sanitizeString(body.service || '', 100),
    timestamp: new Date(),
  };

  next();
};

export default validateAnalyticsEvent;

