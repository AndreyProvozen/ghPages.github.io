import mongoose, { type ConnectOptions, type Connection } from 'mongoose';

import getConfigVariable from './getConfigVariable';

const MONGODB_URI = getConfigVariable('MONGODB_URI', true);

interface CachedMongoose {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

let cached = global.mongoose as CachedMongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

/**
 * Establishes a connection to MongoDB using the provided URI.
 *
 * This function checks if there's an active connection. If a connection already exists,
 * it returns the existing connection. Otherwise, it attempts to connect to the MongoDB
 * instance using the provided URI.
 *
 * @example
 * ```typescript
 * await connectMongodb();
 * ```
 *
 * @returns {Promise<Connection>} - A promise that resolves to the MongoDB connection.
 * @throws Will throw an error if the MONGODB_URI is not defined or if the connection fails.
 */

const connectMongodb = async (): Promise<Connection> => {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts: ConnectOptions = { bufferCommands: false };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw new Error(`Failed to connect to MongoDB: ${(error as Error).message}`);
  }

  return cached.conn;
};

export default connectMongodb;
