const generateRandomNumFromRange = require("./getNumFromRange");
const crypto = require("crypto");

//@desc Generate a random message object
function generateMsgObj(names = [], cities = []) {
  try {
    if (names?.length > 0 && cities?.length > 0) {
      //Get random name from data
      const name = generateRandomNumFromRange(0, names?.length - 1);
      //Get random origin-city from data
      const origin = generateRandomNumFromRange(0, cities?.length - 1);
      //Get random destination-city from data
      const destination = generateRandomNumFromRange(0, cities?.length - 1);
      return {
        name: names[name],
        origin: cities[origin],
        destination: cities[destination],
      };
    } else {
      throw new Error("Invalid Data Format or Data is Empty");
    }
  } catch (err) {
    console.log(
      `utils/genMessage[generateMsgObj] ${err.name} => ${err.message}`
    );
  }
}

//@desc Generate message object with hashed secret key
function generateHashedMsg(obj) {
  try {
    const hash = crypto.createHash(process.env.HASH_ALGO);
    const objStr = JSON.stringify(obj);
    hash.update(objStr);
    obj.secret_key = hash.digest("hex");
    return obj;
  } catch (err) {
    console.log(
      `utils/genMessage[generateHashedMsg] ${err.name} => ${err.message}`
    );
  }
}

module.exports = { generateMsgObj, generateHashedMsg };
