import Founder from '../models/Founder.js';
import { isDBConnected } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { generateToken, setAuthCookie, clearAuthCookie } from '../utils/tokenUtils.js';

/**
 * @desc    Founder Login
 * @route   POST /api/auth/login
 * @access  Public (Rate-limited)
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return sendError(res, 400, 'Please provide both email and password.');
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    // Check if database is connected
    if (isDBConnected()) {
      const founder = await Founder.findOne({ email: normalizedEmail }).select('+password');

      if (!founder) {
        // Generic safe error message to prevent account enumeration
        return sendError(res, 401, 'Invalid email or password credentials.');
      }

      const isMatch = await founder.matchPassword(password);
      if (!isMatch) {
        return sendError(res, 401, 'Invalid email or password credentials.');
      }

      // Update last login
      founder.lastLogin = new Date();
      await founder.save();

      const payload = {
        id: founder._id.toString(),
        email: founder.email,
        name: founder.name,
        role: founder.role,
      };

      const token = generateToken(payload);
      setAuthCookie(res, token);

      return sendSuccess(res, 200, 'Founder authentication successful.', {
        founder: payload,
        token,
      });
    } else {
      // Offline fallback: Check against env variables
      const f1Email = (process.env.FOUNDER_1_EMAIL || 'govind@govindwebsolutions.com').toLowerCase().trim();
      const f1Pass = process.env.FOUNDER_1_PASSWORD || 'FounderGovind#2026';
      const f2Email = (process.env.FOUNDER_2_EMAIL || 'partner@govindwebsolutions.com').toLowerCase().trim();
      const f2Pass = process.env.FOUNDER_2_PASSWORD || 'FounderPartner#2026';

      let matchedFounder = null;
      if (normalizedEmail === f1Email && password === f1Pass) {
        matchedFounder = {
          id: 'founder_1_govind',
          name: process.env.FOUNDER_1_NAME || 'Govind Rathod',
          email: f1Email,
          role: 'founder',
        };
      } else if (normalizedEmail === f2Email && password === f2Pass) {
        matchedFounder = {
          id: 'founder_2_partner',
          name: process.env.FOUNDER_2_NAME || 'Co-founder (Business Development)',
          email: f2Email,
          role: 'founder',
        };
      }

      if (!matchedFounder) {
        return sendError(res, 401, 'Invalid email or password credentials.');
      }

      const token = generateToken(matchedFounder);
      setAuthCookie(res, token);

      return sendSuccess(res, 200, 'Founder authentication successful.', {
        founder: matchedFounder,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Founder Logout
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = (req, res) => {
  clearAuthCookie(res);
  return sendSuccess(res, 200, 'Logged out successfully.');
};

/**
 * @desc    Get Current Authenticated Founder
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = (req, res) => {
  return sendSuccess(res, 200, 'Founder profile retrieved.', {
    founder: req.founder,
  });
};

