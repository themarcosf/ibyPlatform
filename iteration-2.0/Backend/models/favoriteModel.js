const mongoose = require("mongoose");
////////////////////////////////////////////////////////////////////////

const favoriteSchema = new mongoose.Schema(
  {
    realtyId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "auctionId is required"],
      ref: "Realty",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "userId is required"],
      ref: "User",
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

const Favorite = new mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
