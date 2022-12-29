const Bid = require("../models/bidModel");
const { CustomError } = require("../utils/errors");
const { asyncHandler } = require("../utils/handlers");

/**
 * ROUTE HANDLERS
 */
exports.getAllBid = asyncHandler(async function (req, res, next) {
  res
    .status(500)
    .json({
      status: "error",
      message: "TODO",
    })
    .end();
});
