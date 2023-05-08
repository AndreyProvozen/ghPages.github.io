import mongoose from 'mongoose';

const connectMongodb = async (): Promise<void> => {
  mongoose.connect(process.env.MONGO_URI || '');
};

export default connectMongodb;
