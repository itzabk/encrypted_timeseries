require("dotenv").config();
const io = require("socket.io-client");

//Connect with socket instance of reciever
const socket = io(`${process.env.SERVER_URL}:${process.env.PORT}/er`);

//On connection
socket.on("connect", () => {
  console.log(socket.id);
});

//On connection error
socket.on("connect_error", () => {
  console.log("Could not connect to server, Please try again late");
});

//On disconnection
socket.on("disconnect", () => {
  console.log(`${socket.id} disconnected`);
});
