// config/db.js
const mongoose = require("mongoose");

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(process.env.ONLINE_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      tls: true,
    });
    cachedDb = db;
    console.log("Database connected successfully");
    return cachedDb;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
