const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    console.log(process.env.PORT);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      usenewurlparser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("mongoDb is not connected");
    console.error("Mongodb not connected msg", err.message);
    process.exit();
  }
};

module.exports = connectDB;
