const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.MONGO_URL;

async function db() {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to database, disconnecting first");
    await mongoose.disconnect();
  }

  if (!mongoURL) {
    console.error("MONGO URL is not set in environment variable");
  }

  mongoose
    .connect(mongoURL)
    .then(() => {
      const databaseName = mongoose.connection.db.databaseName;
      console.log(`Database connected successfully to ${databaseName}`);
    })
    .catch((e) => {
      console.log(`Error in connecting to the database: ${e.message}`);
    });
}

module.exports = db;
