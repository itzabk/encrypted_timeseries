require("dotenv").config();
const io = require("socket.io-client");
const readFile = require("./utils/readFile");
const path = require("path");

//Get Parsed Data
const data = readFile(path.join(__dirname, "data", "data.json"));
//Extract names-cities from parsed data obj
const { names, cities } = data;

//Connect with socket instance of reciever
const socket = io(`${process.env.SERVER_URL}`, { rejectUnauthorized: false });

//On connection
socket.on("connect", () => {
  console.log(socket.id);
});

//On connection error
socket.on("connect_error", (err) => {
  console.log("Could not connect to server, Please try again later", err);
});

//On disconnection
socket.on("disconnect", () => {
  console.log(`${socket.id} disconnected`);
});
