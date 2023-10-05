var AES = require("crypto-js/aes");

//@desc Decrypt encrypted message using Crypto Library
const decryptMessage = (encMessage) => {
  try {
    const decrypMsg = AES.decrypt(encMessage, process.env.PASSPHRASE, {
      mode: AES.mode.CTR,
    });
    const strMsg = decrypMsg.toString(AES.enc.Utf8);
    return JSON.parse(strMsg);
  } catch (error) {
    console.log(`utils/decryptMessage ${error.name} => ${error.message}`);
  }
};

module.exports = decryptMessage;
