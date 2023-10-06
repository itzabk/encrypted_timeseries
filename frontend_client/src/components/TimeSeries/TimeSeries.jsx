import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://127.0.0.1:3001/er");

socket.on("connect", () => {
  console.log(socket.id);
});

const TimeSeries = () => {
  const [data, setData] = useState([]);

  socket.on("frontend", (data) => {
    console.log(data)

  });



  return <div>TimeSeries</div>;
};

export default TimeSeries;
