const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const databaseInstance = await mongoose.connect(process.env.MONGODBURL);
    return databaseInstance;
  } catch (error) {
    console.log("ERROR IN DATABASE CONNECTION", error);
  }
};

module.exports = connectToDatabase;
