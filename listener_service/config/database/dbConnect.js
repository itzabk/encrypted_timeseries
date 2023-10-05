const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log(
        `Database Connected successfully on host: ${conn.connection.host}`
      );
    }
  } catch (error) {
    console.log(`Connection Failure => ${error.message}`);
  }
};

module.exports = dbConnect;
