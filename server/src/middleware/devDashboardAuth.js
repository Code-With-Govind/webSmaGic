import { sendError } from '../utils/apiResponse.js';

/**
 * Pre-Phase 5 Dashboard Access Guard
 *
 * In production: Disallows any public access (returns 403 Forbidden).
 * In development: Permits local founder preview while logging an advisory notice.
 */
export const devDashboardAuth = (req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    return sendError(
      res,
      403,
      'Access Denied: Private dashboard analytics endpoints are locked pending Phase 5 Founder Authentication & Security.'
    );
  }

  // Development mode: Allow local founder preview
  next();
};

export default devDashboardAuth;

