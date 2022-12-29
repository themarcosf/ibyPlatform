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

/**
 * @param index {Number}: autoincrement function is in controller
 * @param leaseBeginDate {Date}: must ref first day of month
 * @param leaseEndDate {Date} : must ref last day of month
 */
const auctionSchema = new mongoose.Schema(
  {
    realtyId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "realtyId is required"],
      ref: "Realty",
    },
    index: { type: Number, required: true },
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
    bidLog: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Bid",
      },
    ],
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

/**
 * Virtual Properties:
 * enables separation between business logic and application logic
 * derivative fields not to be persisted in the database
 * cannot be manipulated in queries eg Auction.find( $where: { LeaseDurationMonths: 1 })
 */
auctionSchema.virtual("LeaseDurationMonths").get(function () {
  let months;
  months =
    (this.leaseEndDate.getFullYear() - this.leaseBeginDate.getFullYear()) * 12;
  months -= this.leaseBeginDate.getMonth();
  months += this.leaseEndDate.getMonth();
  return ++months;
});
////////////////////////////////////////////////////////////////////////

/**
 * @dev populate and select fields of realtyId reference in Auction document
 */
auctionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "realtyId",
    select: "-__v",
  });
  next();
});

/**
 * @dev populate and select fields of bidLog reference in Auction document
 */
auctionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "bidLog",
    select: "-__v",
  });
  next();
});
////////////////////////////////////////////////////////////////////////

const Auction = new mongoose.model("Auction", auctionSchema);

module.exports = Auction;
