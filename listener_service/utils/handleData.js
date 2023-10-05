const TimeSeries = require("../model/TimeSeries");
const compareHash = require("./compareHash");
const decryptMessage = require("./decryptMessage");
const encodeMessage = require("./encodeMessage");

//@desc Handle incoming encrypted data and perform mongo updations
const handleIncomingData = async (encMessage) => {
  try {
    const positiveCat = [];
    const negativeCat = [];
    const decArr = encMessage.encSplit("|").map((ele) => decryptMessage(ele));
    const hashArr = decArr.map((ele) =>
      encodeMessage({
        name: ele?.name,
        origin: ele?.origin,
        destination: ele?.destination,
      })
    );
    decArr.forEach((ele, i) => {
      if (compareHash(ele, hashArr[i])) {
        positiveCat.push({ ...ele, timestamp: new Date().setSeconds(0, 0) });
      } else {
        negativeCat.push({
          name: ele.name,
          timestamp: new Date().setSeconds(0, 0),
        });
      }
    });
    positiveCat.forEach(async (ele) => {
      await TimeSeries.updateOne(
        {
          name: ele.name,
          timestamp: ele.timestamp,
        },
        {
          name: ele.name,
          timestamp: ele.timestamp,
          $inc: { count: 1 },
          $inc: { totalcount: 1 },
          $push: {
            data: {
              destination: ele.destination,
              origin: ele.origin,
            },
          },
        },
        { upsert: true }
      );
      negativeCat.forEach(async (ele) => {
        await TimeSeries.updateOne(
          {
            name: ele.name,
            timestamp: ele.timestamp,
          },
          { $inc: { totalcount: 1 } },
          { upsert: true }
        );
      });
      return JSON.stringify(positiveCat);
    });
  } catch (error) {
    console.log(`middlewares/handleData ${error.name}=>${error.message}`);
  }
};

module.exports = handleIncomingData;
