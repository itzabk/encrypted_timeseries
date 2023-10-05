const generateRandomNumFromRange = require("./getNumFromRange");

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
      return { name, origin, destination };
    } else {
      throw new Error("Invalid Data Format or Data is Empty");
    }
  } catch (err) {
    console.log(`utils/genMessage ${err.name} => ${err.message}`);
  }
}

module.exports = generateMsgObj;
