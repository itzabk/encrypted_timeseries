//@desc compare hash values of object
const compareHash = (encObj, decObj) => {
  try {
    if (encObj.secret_key === decObj.secret_key) {
      console.log(encObj.secret_key === decObj.secret_key);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`utils/compareHash ${error.name} => ${error.message}`);
  }
};

module.exports = compareHash;
