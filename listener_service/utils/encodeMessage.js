const crypto = require("crypto");

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

module.exports = generateHashedMsg;
