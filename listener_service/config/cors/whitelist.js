//Configure whitelist
const whitelist = [
  `https://127.0.0.1:${process.env.PORT}`,
  `https://localhost:${process.env.PORT}`,
  `http://localhost:3000`,
  `ws://localhost`,
];

module.exports = whitelist;
