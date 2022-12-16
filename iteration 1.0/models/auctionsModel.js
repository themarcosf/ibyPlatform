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

// mongoose format: BSON
const auctionsSchema = new mongoose.Schema(
  {
    realtyId: {
      type: String,
      required: [true, "realtyId is required"],
      trim: true,
      unique: true,
    },
    minValue: {
      type: Number,
      required: [true, "minValue is required."],
    },
    lastBidValue: { type: Number, default: 0 },
    lastBidUser: { type: String, default: "none" },
    lastBidderWallet: { type: String, default: "none" },
    auctionEndDate: {
      type: Number,
      require: [true, "AuctionEndDate is required"],
    },
    leaseBeginDate: {
      type: Number,
      require: [true, "leaseBeginDate is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, //used to permanently hide sensitive data from clients
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//////////////////////////////////////////////////////////////////////////////////////

const Auction = new mongoose.model("Auction", auctionsSchema);

module.exports = Auction;
