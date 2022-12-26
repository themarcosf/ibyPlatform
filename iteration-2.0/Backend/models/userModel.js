const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    favorite: [String],
    wallet: String,
    paymentMethod: String,
    nationalId: Number,
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

const User = new mongoose.model("User", userSchema);

module.exports = User;
