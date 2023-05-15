import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
let cachedConnection = null;

const connectMongodb = async () => {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  const opts = {
    bufferCommands: false,
  };

  cachedConnection = await mongoose.connect(MONGODB_URI, opts);
  return cachedConnection;
};

export default connectMongodb;
