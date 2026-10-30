import Inquiry from '../models/Inquiry.js';
import { isDBConnected } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

/**
 * @desc    Submit a new contact inquiry
 * @route   POST /api/inquiries
 * @access  Public
 */
export const createInquiry = async (req, res, next) => {
  try {
    // Verify database connection status
    if (!isDBConnected()) {
      console.error('[Inquiry Error] Database is not connected. Cannot persist inquiry.');
      return sendError(
        res,
        503,
        'Our database service is temporarily unavailable. Please try again shortly or contact us directly at our email.'
      );
    }

    const {
      fullName,
      email,
      phone,
      company,
      service,
      budget,
      projectDescription,
      preferredContactMethod,
    } = req.cleanData;

    // Create and save document in MongoDB
    const newInquiry = await Inquiry.create({
      fullName,
      email,
      phone,
      company,
      service,
      budget,
      projectDescription,
      preferredContactMethod,
    });

    console.log(`[Inquiry Received] New inquiry logged with ID: ${newInquiry._id} for service: ${service}`);

    return sendSuccess(res, 201, 'Your inquiry has been submitted successfully.', {
      id: newInquiry._id,
      createdAt: newInquiry.createdAt,
    });
  } catch (error) {
    // Forward to centralized error handler
    next(error);
  }
};

