import { sendError } from '../utils/apiResponse.js';

export const notFound = (req, res) => {
  return sendError(res, 404, `Endpoint ${req.originalUrl} not found on this server.`);
};

export default notFound;
