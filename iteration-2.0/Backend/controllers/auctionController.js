const Auction = require("../models/auctionModel");
const { CustomError } = require("../utils/errors");
const { asyncHandler } = require("../utils/handlers");

/**
 * ROUTE HANDLERS
 */
exports.getAllAuction = asyncHandler(async function (req, res, next) {
  // get all auctions from collection
  const _auction = await Auction.find();

  // end request
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
  // get auction from collection
  const _auction = await Auction.findById(req.params.id);

  // if auction not found return new error
  if (!_auction) return next(new CustomError("ID not found", 404));

  // end request
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

exports.updateAuction = asyncHandler(async function (req, res, next) {
  // find auction from collection by ID and update
  const _auction = await Auction.findById(req.params.id);

  // if auction not found return error
  if (!_auction) return next(new CustomError("ID not found", 404));

  // add new bid data to log array
  _auction.auctionLog.push(req.body.auctionLog);
  await _auction.save();

  // end request
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
