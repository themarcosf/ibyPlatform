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
const realtySchema = new mongoose.Schema(
  {
    celoId: {
      type: String,
      required: [true, "celoId is required"],
      trim: true,
      unique: true,
    },
    streetAddress: {
      type: String,
      required: [true, "name is required"],
      maxlength: [50, "lengthmax is 40 digits"],
      trim: true,
    },
    neighborhood: {
      type: String,
      required: [true, "description is required"],
      maxlength: [50, "lengthmax is 500 digits"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "description is required"],
      maxlength: [50, "lengthmax is 500 digits"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "description is required"],
      maxlength: [50, "lengthmax is 500 digits"],
      trim: true,
    },
    contractAddress: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    govtAddress: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    blockHash: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    legalOwner: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    transactionHash: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    ipfsLink: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    tokenBlockHash: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    tokenTransactionHash: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    tokenBlockNumber: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      maxlength: [1000, "description maxlength is 1000"],
      trim: true,
    },
    images: [String],
    lastValuation: {
      type: Number,
      required: [true, "price is required."],
    },
    sqMeters: {
      type: Number,
      required: [true, "price is required."],
    },
    blockNumber: {
      type: Number,
      required: [true, "price is required."],
    },
    gasUsed: {
      type: Number,
      required: [true, "price is required."],
    },
    cumulativeGasUsed: {
      type: Number,
      required: [true, "price is required."],
    },
    effectiveGasPrice: {
      type: Number,
      required: [true, "price is required."],
    },
    inConstruction: Boolean,
    toRetrofit: Boolean,
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

const Realty = new mongoose.model("Realty", realtySchema);

module.exports = Realty;
