import { connect, connections } from 'mongoose';

const { MONGODB_URI } = process.env;

/**
 * Establishes a connection to MongoDB using the provided URI.
 *
 * This function checks if there's an active connection. If a connection already exists,
 * it returns true. Otherwise, it attempts to connect to the MongoDB instance using
 * the provided URI.
 *
 * @example
 * ```typescript
 * await connectMongodb();
 * ```
 *
 * @returns {Promise<boolean>} - A promise that resolves to true when a successful connection is established.
 */

const connectMongodb = async (): Promise<boolean> => {
  if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable inside .env.local');

  if (connections[0].readyState) return true;

  try {
    await connect(MONGODB_URI);
  } catch (error) {
    throw new Error(error);
  }
};

export default connectMongodb;
