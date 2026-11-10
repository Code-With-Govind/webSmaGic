import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { seedFounders } from './services/founderProvisioningService.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Database, Provision Founders & Start Server
const startServer = async () => {
  console.log('[Server Startup] Connecting to database...');
  await connectDB();

  // Provision authorized founder accounts if DB is connected
  await seedFounders();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`WebsMagic API Server running`);
    console.log(`Port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Health Check: http://localhost:${PORT}/api/health`);
    console.log(`=========================================`);
  });

  // Handle graceful shutdowns
  const shutdown = (signal) => {
    console.log(`[Server] Received ${signal}. Closing HTTP server...`);
    server.close(() => {
      console.log('[Server] HTTP server closed cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

startServer().catch((err) => {
  console.error('[Fatal Error] Failed to start server:', err);
  process.exit(1);
});
