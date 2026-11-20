const mongoose = require('mongoose');

// if no real URI is provided, spin up an in-memory MongoDB (great for demos/testing)
const connectDB = async () => {
  let uri = process.env.MONGO_URI;

  const isPlaceholder =
    !uri ||
    uri.includes('<username>') ||
    uri.includes('<password>') ||
    uri === 'undefined';

  if (isPlaceholder) {
    console.log('No MONGO_URI found — starting in-memory MongoDB for demo...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const memServer = await MongoMemoryServer.create();
    uri = memServer.getUri();
    console.log('In-memory MongoDB URI:', uri);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
