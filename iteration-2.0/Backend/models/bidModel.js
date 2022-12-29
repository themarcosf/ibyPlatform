/**
 * IMPORTANT CAVEAT ABOUT MONGOOSE CUSTOM DATA VALIDATORS:
 *
 * inside a validator function (eg images) the THIS keyword
 * is only gonna point to the current document when a NEW document
 * is being created ie POST request
 *
 * that is not true when UPDATING a document ie PATCH request
 */
const mongoose = require("mongoose");
////////////////////////////////////////////////////////////////////////

const bidSchema = new mongoose.Schema(
  {
    auctionId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "auctionId is required"],
      ref: "Auction",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "userId is required"],
      ref: "User",
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

/**
 * @dev populate and select fields of auctionId reference in Bid document
 */
bidSchema.pre(/^find/, function (next) {
  this.populate({
    path: "auctionId",
    select: "-__v",
  });
  next();
});

/**
 * @dev populate and select fields of userId reference in Bid document
 */
bidSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "-__v",
  });
  next();
});
////////////////////////////////////////////////////////////////////////

const Bid = new mongoose.model("Bid", bidSchema);

module.exports = Bid;
