const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    realtyId: String,
    index: Number,
    minimum: Number,
    current: Number,
    periodBegin: Date,
    periodEnd: Date,
    auctionEnd: Date,
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

const Auction = new mongoose.model("Auction", auctionSchema);

module.exports = Auction;
