const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    realtyId: String,
    index: Number,
    minValue: Number,
    currentValue: Number,
    leaseBeginDate: Date,
    leaseEndDate: Date,
    auctionEndDate: Date,
    auctionLog: [Object],
    active: {
      type: Boolean,
      default: true,
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
