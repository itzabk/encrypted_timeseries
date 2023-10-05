const mongoose = require("mongoose");

const timeseriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    data: [
      {
        origin: { type: String },
        destination: { type: String },
      },
    ],
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: _id,
      granularity: "minutes",
    },
  }
);

const TimeSeries = mongoose.model("TimeSeries", timeseriesSchema);

module.exports = TimeSeries;
