const Favorite = require("../models/favoriteModel");
const { asyncHandler } = require("../utils/handlers");

/**
 * ROUTE HANDLERS
 */
exports.createFavorite = asyncHandler(async function (req, res, next) {
  res
    .status(500)
    .json({
      status: "error",
      message: "TODO",
    })
    .end();
});
