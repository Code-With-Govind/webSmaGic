import mongoose from 'mongoose';

/**
 * MongoDB Connection Handler
 */
export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.warn(
      '[Database Warning] MONGODB_URI environment variable is not defined. Inquiries will fail to persist until MongoDB is configured.'
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if server cannot be reached
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`[Database Error] Connection Failed: ${error.message}`);
    return false;
  }
};

/**
 * Check if MongoDB connection is active
 */
export const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

export default connectDB;
