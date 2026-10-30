import mongoose from 'mongoose';

const VALID_STATUSES = ['new', 'contacted', 'in-progress', 'completed', 'rejected'];
const VALID_CONTACT_METHODS = ['Email', 'WhatsApp', 'Phone Call', 'Phone'];

const inquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      maxlength: [255, 'Email cannot exceed 255 characters'],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [30, 'Phone number cannot exceed 30 characters'],
      default: '',
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters'],
      default: '',
    },
    service: {
      type: String,
      required: [true, 'Service required field is required'],
      trim: true,
      maxlength: [100, 'Service name cannot exceed 100 characters'],
    },
    budget: {
      type: String,
      trim: true,
      maxlength: [50, 'Budget range cannot exceed 50 characters'],
      default: '',
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      minlength: [10, 'Project description must be at least 10 characters'],
      maxlength: [5000, 'Project description cannot exceed 5000 characters'],
    },
    preferredContactMethod: {
      type: String,
      required: [true, 'Preferred contact method is required'],
      enum: {
        values: VALID_CONTACT_METHODS,
        message: 'Preferred contact method must be Email, WhatsApp, or Phone Call',
      },
      default: 'Email',
    },
    status: {
      type: String,
      enum: {
        values: VALID_STATUSES,
        message: 'Status must be one of: new, contacted, in-progress, completed, rejected',
      },
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Index for sorting inquiries by creation date
inquirySchema.index({ createdAt: -1 });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;

