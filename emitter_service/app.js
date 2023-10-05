require("dotenv").config();
const io = require("socket.io-client");
const readFile = require("./utils/readFile");
const path = require("path");
const genEncDataStream = require("./utils/genEncDataStream");

//Handle Uncaught Exceptions
process.on("uncaughtException", (error) => {
  console.log(
    `Exception Occured: Name: ${error.name} =>  Message:${error.message} ${error.stack}`
  );
});

//Get Parsed Data
const data = readFile(path.join(__dirname, "data", "data.json"));

//Connect with socket instance of reciever
const socket = io(`${process.env.SERVER_URL}`, { rejectUnauthorized: false });

//On connection
socket.on("connect", () => {
  console.log(socket.id);
  if (socket.connected) {
    setInterval(() => {
      socket.emit("enc-data-stream", genEncDataStream(data));
    }, process.env.TIME_IN_SEC * 1000);
  }
  socket.on("error", () => {
    console.log("Encrypted data stream transmission failed");
  });
});

//On connection error
socket.on("connect_error", (err) => {
  socket.close();
  console.log("Could not connect to server, Please try again later");

});

//On disconnection
socket.on("disconnect", () => {
  console.log(`Server disconnected`);
});

//Handle Unhandled Rejections
process.on("unhandledRejection", (error) => {
  console.log(
    `Rejection Occured : Name: ${error.name} =>  Message:${error.message}`
  );
  server.close();
  process.exit(1);
});
