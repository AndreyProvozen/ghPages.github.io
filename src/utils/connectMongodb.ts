import mongoose from 'mongoose';

const connectMongodb = async (): Promise<void> => {
  mongoose.connect(process.env.MONGODB_URI || '');
};

export default connectMongodb;
