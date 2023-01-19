/**
 * @dev mongoDB supports geospatial data coords
 * @dev standard: GeoJSON [long, lat]
 */
const mongoose = require("mongoose");
////////////////////////////////////////////////////////////////////////

const realtySchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "address is required"],
      maxlength: [50, "maximum length is 50 digits"],
      trim: true,
    },
    complement: {
      type: String,
      maxlength: [50, "maximum length is 50 digits"],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "district is required"],
      maxlength: [50, "maximum length is 50 digits"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "city is required"],
      maxlength: [50, "maximum length is 50 digits"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "state is required"],
      enum: {
        values: ["ES", "MG", "RJ", "SP"],
        message: "invalid state",
      },
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minlength: [50, "minimum length is 50 digits"],
      maxlength: [500, "maximum length is 500 digits"],
      trim: true,
    },
    geoLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    imageCover: {
      type: String,
      required: [true, "imageCover is required"],
      maxlength: [50, "maximum length is 50 digits"],
      trim: true,
    },
    images: {
      type: [String],
      validate: {
        validator: function (val) {
          let _isValid;
          val.forEach((el) => {
            if (el !== el.trim() || el.length > 50) _isValid = false;
          });
          return _isValid;
        },
        message: "invalid path: {VALUE}",
      },
    },
    sqMeters: { type: Number, required: true },
    inConstruction: { type: Boolean, required: true },
    toRetrofit: { type: Boolean, required: true },
    tokenId: Number,
    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "inactive"],
        message: "Invalid status",
      },
      select: false,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      select: false,
    },
    vip: {
      type: Boolean,
      default: false,
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

realtySchema.virtual("auctions", {
  ref: "Auction",
  foreignField: "realtyId",
  localField: "_id",
});
////////////////////////////////////////////////////////////////////////

const Realty = new mongoose.model("Realty", realtySchema);

module.exports = Realty;
