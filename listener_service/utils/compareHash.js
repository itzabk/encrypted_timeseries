//@desc compare hash values of object
const compareHash = async (encObj, decObj) => {
  try {
    if (encObj.secret_key === decObj.secret_key) {
      return true;
    } else if (encObj.secret_key !== decObj.secret_key) {
      return false;
    }
  } catch (error) {
    console.log(`utils/compareHash ${error.name} => ${error.message}`);
  }
};

module.exports = compareHash;
