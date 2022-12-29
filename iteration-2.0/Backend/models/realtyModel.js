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

const realtySchema = new mongoose.Schema(
  {
    address: {
      type: String,
      unique: [true, "address already exists"],
      required: [true, "address is required"],
      minLength: [5, "invalid length"],
      maxLengh: [40, "invalid lengh"],
      trim: true,
    },
    complement: {
      type: String,
      maxLengh: [40, "invalid lengh"],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "district is required"],
      minLength: [2, "invalid length"],
      maxLengh: [40, "invalid lengh"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "city is required"],
      minLength: [2, "invalid length"],
      maxLengh: [40, "invalid lengh"],
      trim: true,
    },
    state: {
      type: String,
      enum: ["ES", "MG", "RJ", "SP"],
      required: [true, "state is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: [50, "invalid length"],
      maxLengh: [500, "invalid lengh"],
      trim: true,
    },
    /**
     * mongoDB supports geospatial data coords
     * standard: GeoJSON [long, lat]
     */
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
      minlength: [4, "lengthmin is 4 digits"],
      maxlength: [20, "lengthmax is 20 digits"],
      trim: true,
    },
    images: {
      type: [String],
      validate: {
        validator: function (val) {
          let _isValid;
          val.forEach((el) => {
            if (el !== el.trim() || el.length < 4 || el.length > 20)
              _isValid = false;
          });
          return _isValid;
        },
        message: "invalid path: {VALUE}",
      },
    },
    sqMeters: { type: Number, required: true },
    inConstruction: { type: Boolean, required: true },
    toRetrofit: { type: Boolean, required: true },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    vip: {
      type: Boolean,
      default: false,
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

const Realty = new mongoose.model("Realty", realtySchema);

module.exports = Realty;
