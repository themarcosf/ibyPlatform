const mongoose = require("mongoose");

/**
 * @param index {Number}: autoincrement function in controller
 * @param leaseBeginDate {Date}: must ref first day of month
 * @param leaseEndDate {Date} : must ref last day of month
 */
const auctionSchema = new mongoose.Schema(
  {
    realtyId: {
      type: mongoose.Schema.ObjectId,
      ref: "Realty",
      required: [true, "realtyId is required"],
    },
    index: Number,
    minAskValue: { type: Number, required: true },
    auctionEndDate: { type: Date, required: true },
    leaseBeginDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (val) {
          let _isValid;
          if (val <= this.auctionEndDate) _isValid = false;
          return _isValid;
        },
        message: "lease must begin after auction end date",
      },
    },
    leaseEndDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (val) {
          let _isValid;
          if (val <= this.leaseBeginDate) _isValid = false;
          return _isValid;
        },
        message: "lease must end after lease begin date",
      },
    },
    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "inactive"],
        message: "Invalid status",
      },
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

auctionSchema.virtual("LeaseDurationMonths").get(function () {
  let months;
  months =
    (this.leaseEndDate.getFullYear() - this.leaseBeginDate.getFullYear()) * 12;
  months -= this.leaseBeginDate.getMonth();
  months += this.leaseEndDate.getMonth();
  return ++months;
});

auctionSchema.virtual("bids", {
  ref: "Bid",
  foreignField: "auctionId",
  localField: "_id",
});
////////////////////////////////////////////////////////////////////////

const Auction = new mongoose.model("Auction", auctionSchema);

module.exports = Auction;
