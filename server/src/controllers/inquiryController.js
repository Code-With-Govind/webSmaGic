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

const VALID_STATUSES = ['new', 'contacted', 'in-progress', 'completed', 'rejected'];

/**
 * @desc    Get all persistent inquiries for authenticated founders
 * @route   GET /api/inquiries
 * @access  Private (Founders Only)
 */
export const getInquiriesList = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      return sendSuccess(res, 200, 'Database offline; empty inquiries list returned.', {
        inquiries: [],
        total: 0,
      });
    }

    const { status, search, limit = 50, page = 1 } = req.query;
    const query = {};

    if (status && status !== 'all' && VALID_STATUSES.includes(status)) {
      query.status = status;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { fullName: regex },
        { email: regex },
        { company: regex },
        { service: regex },
        { phone: regex },
      ];
    }

    const parsedLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 100);
    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const skip = (parsedPage - 1) * parsedLimit;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit)
        .lean(),
      Inquiry.countDocuments(query),
    ]);

    return sendSuccess(res, 200, 'Inquiries retrieved successfully.', {
      inquiries,
      total,
      page: parsedPage,
      limit: parsedLimit,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update inquiry status (e.g. from new to contacted/completed)
 * @route   PATCH /api/inquiries/:id/status
 * @access  Private (Founders Only)
 */
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return sendError(
        res,
        400,
        `Invalid status. Status must be one of: ${VALID_STATUSES.join(', ')}`
      );
    }

    if (!isDBConnected()) {
      return sendError(res, 503, 'Database is temporarily offline.');
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedInquiry) {
      return sendError(res, 404, 'Inquiry not found.');
    }

    console.log(`[Inquiry Status] Inquiry ${id} updated to ${status} by founder: ${req.founder?.email}`);

    return sendSuccess(res, 200, `Inquiry status updated to "${status}".`, updatedInquiry);
  } catch (error) {
    next(error);
  }
};


