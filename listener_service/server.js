//Import Modules
require("dotenv").config();
require("./config/database/dbConnect")();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { Server } = require("socket.io");
const https = require("https");
const mongoErrLogger = require("./middlewares/mongoErrLogger");
const errLogger = require("./middlewares/errLogger");
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const corsOptions = require("./config/cors/corsOptions");
const { instrument } = require("@socket.io/admin-ui");
const handleIncomingData = require("./utils/handleData");

//Handle Uncaught Exceptions
process.on("uncaughtException", (error) => {
  console.log(
    `Exception Occured: Name: ${error.name} =>  Message:${error.message} ${error.stack}`
  );
  process.exit(1);
});

//Create global app instance
const app = express();
//Set security headers
app.use(helmet());
//Set CORS
app.use(cors(corsOptions));
//Parse JSON data
app.use(express.json({ limit: "800kb" }));

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("common"));
}

//Create HTTPS Server instance
const server = https.createServer(
  {
    cert: fs.readFileSync(
      path.join(__dirname, "config", "https", "server.cert"),
      "utf-8"
    ),
    key: fs.readFileSync(
      path.join(__dirname, "config", "https", "server.key"),
      "utf-8"
    ),
  },
  app
);

//Create Socket IO instance
const io = new Server(server);
//Create Emitter-Reciever Socket IO namespace
const erIO = io.of("/er");

//Connect to admin dashboard
instrument(io, {
  auth: false,
  mode: "development",
});

//Listen for socket connection
erIO.on("connection", (socket) => {
  console.log(socket?.id);
  socket.on("enc-data-stream", async (data) => {
    console.log("encdata", data);
    const result = await handleIncomingData(data);
    socket.emit("frontend", result);
  });
});

//On Client Disconnect
erIO.on("disconnect", () => {
  console.log("Client has disconnected");
});

//Default root route for server
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Homepage" });
});

//Handle unknown route requests
app.all("*", (req, res) => {
  if (req.accepts("json")) {
    res.status(404).json({ message: "Page that you are looking is not found" });
  } else if (req.accepts("text/plain")) {
    res.status(404).send("Page that you are looking is not found");
  }
});

//Default error handler and logging
app.use(errLogger);

//Check for open MongoDB connection
mongoose.connection.once("open", () => {
  server.listen(process.env.PORT, () => {
    console.log(
      `Server is up and running on : https://127.0.0.1:${process.env.PORT}`
    );
  });
});

//Check for connection errors
mongoose.connection.on("error", (error) => {
  console.log(`Mongoose error => ${error.message}`);
  mongoErrLogger(error);
});

//Handle Unhandled Rejections
process.on("unhandledRejection", (error) => {
  console.log(
    `Rejection Occured : Name: ${error.name} =>  Message:${error.message}`
  );
  server.close();
  process.exit(1);
});
