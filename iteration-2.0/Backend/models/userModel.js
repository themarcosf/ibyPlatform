const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      maxlength: [40, "maximum length is 40 digits"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "email is invalid"],
    },
    wallet: {
      type: String,
      minlength: [42, "wallet length is 42 digits"],
      maxlength: [42, "wallet length is 42 digits"],
      trim: true,
      unique: true,
      select: false,
    },
    // TODO : validate CPF CNPJ
    nationalId: {
      type: Number,
      unique: true,
      select: false,
    },
    // TODO : validate
    mobile: {
      type: Number,
      select: false,
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
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "owner", "admin"],
        message: "Invalid user role",
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
//////////////////////////////////////////////////////////////////

/**
 * @notice regex /^param/ : any expression starting with param
 */
userSchema.pre(/^find/, function (next) {
  this.find({ status: { $ne: "inactive" } });
  next();
});
//////////////////////////////////////////////////////////////////

const User = new mongoose.model("User", userSchema);

module.exports = User;
