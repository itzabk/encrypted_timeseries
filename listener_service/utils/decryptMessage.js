const CryptoJS = require("crypto-js");

//@desc Decrypt encrypted message using Crypto Library
const decryptMessage = (encMessage) => {
  try {
    const decrypMsg = CryptoJS.AES.decrypt(encMessage, process.env.PASSPHRASE, {
      mode: CryptoJS.mode.CTR,
    });
    const strMsg = decrypMsg.toString(CryptoJS.enc.Utf8);
    return JSON.parse(strMsg);
  } catch (error) {
    console.log(`utils/decryptMessage ${error.name} => ${error.message}`);
  }
};

module.exports = decryptMessage;
