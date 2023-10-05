const mongoose = require("mongoose");

const timeseriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  counter: {
    type: Number,
  },
  totalCount: {
    type: Number,
    required: true,
  },
  data: [
    {
      origin: { type: String, required: true },
      destination: { type: String, required: true },
    },
  ],
});

const TimeSeriesModel = mongoose.model("TimeSeries", timeseriesSchema);

module.exports = TimeSeriesModel;
