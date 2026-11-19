import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error conectando MongoDB:', error.message);
    process.exit(1);
  }
};
