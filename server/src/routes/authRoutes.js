import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, logout, getMe } from '../controllers/authController.js';
import { requireFounderAuth } from '../middleware/requireFounderAuth.js';

const router = Router();

// Strict Rate Limiting for Login: Max 5 attempts per 15 minutes per IP
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP address. Please try again after 15 minutes.',
  },
});

// Authentication Routes
router.post('/login', loginRateLimiter, login);
router.post('/logout', logout);
router.get('/me', requireFounderAuth, getMe);

export default router;

