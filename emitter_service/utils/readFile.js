const fs = require("fs");

//@desc read file data synchronously and return parsed data
const readFile = (path) => {
  try {
    const fileData = fs.readFileSync(path, { encoding: "utf8", flag: "r" });
    return JSON.parse(fileData);
  } catch (err) {
    console.log(`utils/readFile ${err.name} => ${err.message}`);
  }
};

module.exports = { readFile };
