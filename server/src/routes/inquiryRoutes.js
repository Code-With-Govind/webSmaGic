import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  createInquiry,
  getInquiriesList,
  updateInquiryStatus,
} from '../controllers/inquiryController.js';
import { validateInquiry } from '../middleware/validateInquiry.js';
import { requireFounderAuth } from '../middleware/requireFounderAuth.js';

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

// 1. PUBLIC ROUTE: Submit new inquiry
router.post('/', inquiryRateLimiter, validateInquiry, createInquiry);

// 2. PROTECTED FOUNDER ROUTES: Manage inquiry feed & lead status
router.get('/', requireFounderAuth, getInquiriesList);
router.patch('/:id/status', requireFounderAuth, updateInquiryStatus);

export default router;

