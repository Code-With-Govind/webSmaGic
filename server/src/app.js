import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import inquiryRoutes from './routes/inquiryRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import { isDBConnected } from './config/db.js';
import { sendSuccess } from './utils/apiResponse.js';

dotenv.config();

const app = express();

// 1. Trust reverse proxy (e.g. Render, AWS, Cloudflare, Nginx)
app.set('trust proxy', 1);

// 2. Security Headers via Helmet
app.use(helmet());

// 3. CORS Configuration with Multi-Origin & Credentials Support
const rawClientUrls = process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = rawClientUrls
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server, health check probes)
      if (!origin) {
        return callback(null, true);
      }
      if (process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error(`Blocked by CORS policy: Origin ${origin} is not allowed`));
    },
    credentials: true, // Allow cookies over CORS
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);

// 3. Body & Cookie Parsers
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 4. API Status & Health-Check Endpoints
app.get('/', (req, res) => {
  return sendSuccess(res, 200, 'Govind Web Solutions API Server', {
    service: 'Govind Web Solutions Backend API',
    status: 'online',
    healthCheck: '/api/health',
    version: '1.0.0',
  });
});

app.get('/api/health', (req, res) => {
  return sendSuccess(res, 200, 'Govind Web Solutions API is operational', {
    status: 'healthy',
    database: isDBConnected() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// 5. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/analytics', analyticsRoutes);

// 6. 404 Catch-All & Error Handler
app.use(notFound);
app.use(errorHandler);

export default app;
