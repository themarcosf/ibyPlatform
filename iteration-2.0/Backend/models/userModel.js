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
    avatar: {
      type: String,
      trim: true,
    },
    wallet: {
      type: String,
      trim: true,
    },
    // TODO : validate CPF CNPJ
    nationalId: {
      type: Number,
      unique: true,
    },
    // TODO : validate
    mobile: Number,
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

const User = new mongoose.model("User", userSchema);

module.exports = User;
