const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      server: {
        auto_reconnect: true,
        socketOptions: {
          connectTimeoutMS: 3600000,
          keepAlive: 3600000,
          socketTimeoutMS: 3600000,
        },
      },
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
