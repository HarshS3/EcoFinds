import mongoose from 'mongoose';

// const MONGO_URI = process.env.MONGO_URI;

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI, {
    autoIndex: true
  });
  console.log('MongoDB connected');
}
