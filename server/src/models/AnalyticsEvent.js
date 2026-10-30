import mongoose from 'mongoose';

const ALLOWED_EVENT_TYPES = [
  'page_view',
  'service_cta_click',
  'inquiry_attempt',
  'inquiry_success',
];

const analyticsEventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      enum: {
        values: ALLOWED_EVENT_TYPES,
        message: 'Invalid event type',
      },
      trim: true,
      index: true,
    },
    visitorId: {
      type: String,
      required: [true, 'Visitor ID is required'],
      trim: true,
      maxlength: 64,
      index: true,
    },
    sessionId: {
      type: String,
      required: [true, 'Session ID is required'],
      trim: true,
      maxlength: 64,
      index: true,
    },
    pagePath: {
      type: String,
      required: [true, 'Page path is required'],
      trim: true,
      maxlength: 255,
      index: true,
    },
    referrer: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    source: {
      type: String,
      trim: true,
      maxlength: 100,
      default: 'direct',
      index: true,
    },
    medium: {
      type: String,
      trim: true,
      maxlength: 100,
      default: '',
    },
    campaign: {
      type: String,
      trim: true,
      maxlength: 100,
      default: '',
    },
    service: {
      type: String,
      trim: true,
      maxlength: 100,
      default: '',
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    // Capped or optimized without collection overhead
    versionKey: false,
  }
);

// Compound indexes for high-speed dashboard aggregation queries
analyticsEventSchema.index({ eventType: 1, timestamp: -1 });
analyticsEventSchema.index({ timestamp: -1, pagePath: 1 });
analyticsEventSchema.index({ timestamp: -1, source: 1 });

const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);

export default AnalyticsEvent;
