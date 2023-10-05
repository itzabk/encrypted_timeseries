//Configure whitelist
const whitelist = [
  `https://127.0.0.1:${process.env.PORT}`,
  `https://localhost:${process.env.PORT}`,
  `ws://localhost`,
  `https://admin.socket.io/*`,
  `http://localhost:3000/`
];

module.exports = whitelist;
