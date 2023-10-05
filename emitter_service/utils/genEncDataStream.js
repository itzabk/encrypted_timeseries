const {
  generateMsgObj,
  generateHashedMsg,
  encryptHashedMessage,
} = require("./genMessage");
//@desc Generate Encryoted Data stream
function generateEncryptedDataStream(data) {
  try {
    //Extract names-cities from parsed data obj
    const { names, cities } = data;
    const encArry = [];
    const num = generateRandomNumFromRange(process.env.MIN, process.env.MAX);

    for (let i = 0; i < num; i++) {
      const msg = generateMsgObj(names, cities);
      const hashMsg = generateHashedMsg(msg);
      const encMsg = encryptHashedMessage(hashMsg);
      encArry.push(encMsg);
    }
    return encArry.join("|");
  } catch (err) {
    console.log(`Encrypted Messaging failed ${err.name} => ${err.message}`);
  }
}

module.exports = generateEncryptedDataStream;
