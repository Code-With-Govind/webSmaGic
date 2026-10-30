import { sendError } from '../utils/apiResponse.js';

/**
 * Centralized Express Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('[Server Error Handler]:', err.name || 'Error', err.message || '');

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }));
    return sendError(res, 400, 'Validation failed for submitted data.', errors);
  }

  // Mongoose CastError (invalid ObjectId, etc.)
  if (err.name === 'CastError') {
    return sendError(res, 400, 'Invalid resource format.');
  }

  // Request entity too large (body-parser limit exceeded)
  if (err.type === 'entity.too.large') {
    return sendError(res, 413, 'Request payload too large. Maximum allowed size is 10KB.');
  }

  // Generic internal server error (never leak internal stack trace in production)
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'development'
      ? err.message || 'An unexpected error occurred.'
      : 'Something went wrong on our servers. Please try again later.';

  return sendError(res, statusCode, message);
};

export default errorHandler;
