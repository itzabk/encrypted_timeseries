const TimeSeriesModel = require("../model/TimeSeries");
const compareHash = require("./compareHash");
const decryptMessage = require("./decryptMessage");
const encodeMessage = require("./encodeMessage");

//@desc Handle incoming encrypted data and perform mongo updations
const handleIncomingData = async (encMessage) => {
  try {
    const positiveCat = [];
    const negativeCat = [];
    const decArr = encMessage.split("|").map((ele) => decryptMessage(ele));
    const hashArr = decArr.map((ele) =>
      encodeMessage({
        name: ele?.name,
        origin: ele?.origin,
        destination: ele?.destination,
      })
    );
    decArr.forEach((ele, i) => {
      if (compareHash(ele, hashArr[i])) {
        positiveCat.push({
          name: ele?.name,
          origin: ele?.origin,
          destination: ele?.destination,
          timestamp: new Date().setSeconds(0, 0),
        });
      } else {
        negativeCat.push({
          name: ele.name,
          timestamp: new Date().setSeconds(0, 0),
        });
      }
    });

    positiveCat.forEach(async (ele) => {
      await TimeSeriesModel.updateOne(
        {
          name: ele.name,
          timestamp: ele.timestamp,
        },
        {
          $inc: { counter: 1, totalCount: 1 },
          name: ele.name,
          timestamp: ele.timestamp,
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
        await TimeSeriesModel.updateOne(
          {
            name: ele.name,
            timestamp: ele.timestamp,
          },
          { $inc: { totalCount: 1 } },
          { upsert: true }
        );
      });

      const data = await TimeSeriesModel.find({}).lean().exec();
      if (!data?.length) {
        console.log("Nothing to fetch yet..!");
      }
      console.log("Data", JSON.stringify(data));
      return JSON.stringify(data);
    });
  } catch (error) {
    console.log(`utils/handleData ${error.name}=>${error.message}`);
  }
};

module.exports = handleIncomingData;
