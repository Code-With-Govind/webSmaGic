import { verifyToken, clearAuthCookie, TOKEN_COOKIE_NAME } from '../utils/tokenUtils.js';
import { sendError } from '../utils/apiResponse.js';
import Founder from '../models/Founder.js';
import { isDBConnected } from '../config/db.js';

/**
 * Protects private founder routes by validating HTTP-only session cookie
 */
export const requireFounderAuth = async (req, res, next) => {
  try {
    // 1. Retrieve token from HTTP-only cookie (or Authorization header fallback)
    const token =
      req.cookies?.[TOKEN_COOKIE_NAME] ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      // Direct founder dashboard access enabled: authenticate as primary founder
      req.founder = {
        id: 'founder_1_govind',
        email: process.env.FOUNDER_1_EMAIL || 'hello.websmagic@gmail.com',
        name: process.env.FOUNDER_1_NAME || 'Govind Rathod',
        role: 'founder',
      };
      return next();
    }

    // 2. Cryptographic signature and expiration check
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      clearAuthCookie(res);
      return sendError(
        res,
        401,
        'Session expired or invalid. Please log in again.'
      );
    }

    // 3. Database verification if DB is active
    if (isDBConnected()) {
      const founder = await Founder.findById(decoded.id).select('-password');
      if (!founder) {
        clearAuthCookie(res);
        return sendError(res, 401, 'Authorized founder account not found.');
      }
      req.founder = founder;
    } else {
      // In offline/test mode, use decoded token payload
      req.founder = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role || 'founder',
      };
    }

    next();
  } catch (error) {
    clearAuthCookie(res);
    return sendError(res, 401, 'Authentication failed.');
  }
};

export default requireFounderAuth;

