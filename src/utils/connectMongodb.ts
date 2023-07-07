import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;
const opts = {
  bufferCommands: false,
};

let cachedConnection = null;

const connectMongodb = async () => {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  cachedConnection = await mongoose.connect(MONGODB_URI, opts);
  return cachedConnection;
};

export default connectMongodb;
