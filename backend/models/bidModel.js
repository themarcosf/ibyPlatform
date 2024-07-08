const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    auctionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Auction",
      required: [true, "auctionId is required"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    bidValue: {
      type: Number,
      required: [true, "bid value is required"],
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

const Bid = new mongoose.model("Bid", bidSchema);

module.exports = Bid;
