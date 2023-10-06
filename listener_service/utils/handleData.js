const TimeSeriesModel = require("../model/TimeSeries");
const compareHash = require("./compareHash");
const decryptMessage = require("./decryptMessage");
const encodeMessage = require("./encodeMessage");

//@desc Handle incoming encrypted data and perform mongo updations
const handleIncomingData = async (encMessage) => {
  try {
    encMessage
      .split("|")
      .map((ele) => decryptMessage(ele))
      .forEach(async (ele) => {
        if (
          compareHash(
            ele,
            encodeMessage({
              name: ele?.name,
              origin: ele?.origin,
              destination: ele?.destination,
            })
          )
        ) {
          await TimeSeriesModel.updateOne(
            {
              name: ele?.name,
              timestamp: new Date().setSeconds(0, 0),
            },
            {
              $inc: { counter: 1, totalCount: 1 },
              name: ele?.name,
              timestamp: ele?.timestamp,
              $push: {
                data: {
                  destination: ele?.destination,
                  origin: ele?.origin,
                },
              },
            },
            { upsert: true }
          );
        } else {
          await TimeSeriesModel.updateOne(
            {
              name: ele.name,
              timestamp: ele.timestamp,
            },
            { $inc: { totalCount: 1 } },
            { upsert: true }
          );
        }
      });
    const data = await TimeSeriesModel.find({}).lean().exec();
    if (!data?.length) {
      console.log("Nothing to fetch yet..!");
    }

    return JSON.stringify(data);
  } catch (error) {
    console.log(`utils/handleData ${error.name}=>${error.message}`);
  }
};

module.exports = handleIncomingData;
