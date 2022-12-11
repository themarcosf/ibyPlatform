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
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    officialId: {
      type: Number,
      required: [true, "minValue is required."],
    },
    password: {
      type: String,
      required: [true, "realtyId is required"],
      trim: true,
    },
    wallet: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
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

const User = new mongoose.model("User", userSchema);

module.exports = User;
