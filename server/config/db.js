const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000, autoIndex: true });
  console.log("✅ MongoDB connected");
};

module.exports = connectDB;
