import jwt from 'jsonwebtoken';

const TOKEN_COOKIE_NAME = 'websmagic_founder_token';
const getJwtSecret = () => process.env.SESSION_SECRET || 'websmagic-super-secure-session-secret-key-at-least-32-chars';

/**
 * Generate cryptographically signed JWT for founder session
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: '24h',
  });
};

/**
 * Verify signed JWT
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch {
    return null;
  }
};

/**
 * Attach secure HTTP-only session cookie to response
 */
export const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const sameSite = process.env.COOKIE_SAMESITE || (isProduction ? 'none' : 'lax');
  const secure = isProduction || sameSite === 'none';

  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/',
  });
};

/**
 * Clear session cookie on logout
 */
export const clearAuthCookie = (res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const sameSite = process.env.COOKIE_SAMESITE || (isProduction ? 'none' : 'lax');
  const secure = isProduction || sameSite === 'none';

  res.clearCookie(TOKEN_COOKIE_NAME, {
    httpOnly: true,
    secure,
    sameSite,
    path: '/',
  });
};

export { TOKEN_COOKIE_NAME };

