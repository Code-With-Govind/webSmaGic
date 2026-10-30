import { sendError } from '../utils/apiResponse.js';

// Strip potential HTML/script tags
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const VALID_CONTACT_METHODS = ['Email', 'WhatsApp', 'Phone Call', 'Phone'];

export const validateInquiry = (req, res, next) => {
  const errors = [];
  const body = req.body || {};

  // Support both frontend field naming conventions
  const fullName = sanitizeString(body.fullName);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = sanitizeString(body.phone);
  const company = sanitizeString(body.company || body.companyName);
  const service = sanitizeString(body.service);
  const budget = sanitizeString(body.budget);
  const projectDescription = sanitizeString(body.projectDescription || body.description);
  const preferredContactMethod = sanitizeString(body.preferredContactMethod || body.contactMethod || 'Email');

  // Full Name Validation
  if (!fullName) {
    errors.push({ field: 'fullName', message: 'Full name is required.' });
  } else if (fullName.length < 2) {
    errors.push({ field: 'fullName', message: 'Full name must be at least 2 characters.' });
  } else if (fullName.length > 100) {
    errors.push({ field: 'fullName', message: 'Full name cannot exceed 100 characters.' });
  }

  // Email Validation
  if (!email) {
    errors.push({ field: 'email', message: 'Email address is required.' });
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email address.' });
  } else if (email.length > 255) {
    errors.push({ field: 'email', message: 'Email cannot exceed 255 characters.' });
  }

  // Service Validation
  if (!service) {
    errors.push({ field: 'service', message: 'Please select a required service.' });
  } else if (service.length > 100) {
    errors.push({ field: 'service', message: 'Service name cannot exceed 100 characters.' });
  }

  // Project Description Validation
  if (!projectDescription) {
    errors.push({ field: 'projectDescription', message: 'Project description is required.' });
  } else if (projectDescription.length < 10) {
    errors.push({ field: 'projectDescription', message: 'Project description must be at least 10 characters.' });
  } else if (projectDescription.length > 5000) {
    errors.push({ field: 'projectDescription', message: 'Project description cannot exceed 5000 characters.' });
  }

  // Preferred Contact Method Validation
  if (preferredContactMethod && !VALID_CONTACT_METHODS.includes(preferredContactMethod)) {
    errors.push({
      field: 'preferredContactMethod',
      message: 'Preferred contact method must be Email, WhatsApp, or Phone Call.',
    });
  }

  // Optional fields length validation
  if (phone && phone.length > 30) {
    errors.push({ field: 'phone', message: 'Phone number cannot exceed 30 characters.' });
  }
  if (company && company.length > 100) {
    errors.push({ field: 'company', message: 'Company name cannot exceed 100 characters.' });
  }
  if (budget && budget.length > 50) {
    errors.push({ field: 'budget', message: 'Budget range cannot exceed 50 characters.' });
  }

  if (errors.length > 0) {
    return sendError(res, 400, 'Please check the submitted information.', errors);
  }

  // Attach sanitized, normalized payload to req.cleanData
  req.cleanData = {
    fullName,
    email,
    phone,
    company,
    service,
    budget,
    projectDescription,
    preferredContactMethod,
  };

  next();
};

export default validateInquiry;

