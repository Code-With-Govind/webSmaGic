import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createInquiry } from '../controllers/inquiryController.js';
import { validateInquiry } from '../middleware/validateInquiry.js';

const router = Router();

// Abuse & Spam Protection: Max 10 inquiries per 15 minutes per IP
const inquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many project inquiries submitted from this connection. Please try again in 15 minutes.',
  },
});

// POST /api/inquiries
router.post('/', inquiryRateLimiter, validateInquiry, createInquiry);

export default router;
