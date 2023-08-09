import { connect, connections } from 'mongoose';

const { MONGODB_URI } = process.env;

const connectMongodb = async () => {
  if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable inside .env.local');

  if (connections[0].readyState) return true;

  try {
    await connect(MONGODB_URI);
  } catch (error) {
    throw new Error(error);
  }
};

export default connectMongodb;
