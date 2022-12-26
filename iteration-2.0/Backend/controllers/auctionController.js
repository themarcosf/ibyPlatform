const Auction = require("../models/auctionModel");
const { CustomError } = require("../utils/errors");
const { asyncHandler } = require("../utils/handlers");

/**
 * ROUTE HANDLERS
 */
exports.getAllAuction = asyncHandler(async function (req, res, next) {
  const _auction = await Auction.find();

  res
    .status(200)
    .json({
      status: "success",
      results: _auction.length,
      data: {
        auction: _auction,
      },
    })
    .end();
});

exports.getAuction = asyncHandler(async function (req, res, next) {
  const _auction = await Auction.findById(req.params.id);

  if (!_auction) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: {
        auction: _auction,
      },
    })
    .end();
});
