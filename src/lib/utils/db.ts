// lib/utils/db.ts
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);   // Google DNS

import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      dbName: 'srilankatripai', // Your database name
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};