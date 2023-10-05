const generateRandomNumFromRange = (min = 0, max = 1) => {
  try {
    min = Number(min);
    max = Number(max);
    if (isNaN(min) || isNaN(max)) {
      throw new Error("Invalid Number Argument");
    }
    return Math.floor(Math.random() * max - min + 1) + min;
  } catch (error) {
    console.log(`utils/getNumFromRange ${error.name} => ${error.message}`);
  }
};

module.exports = generateRandomNumFromRange;
