const mongoose = require("mongoose");

const realtySchema = new mongoose.Schema(
  {
    address: String,
    district: String,
    city: String,
    state: String,
    description: String,
    images: [String],
    sqMeters: Number,
    inConstruction: Boolean,
    toRetrofit: Boolean,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
////////////////////////////////////////////////////////////////////////

const Realty = new mongoose.model("Realty", realtySchema);

module.exports = Realty;
