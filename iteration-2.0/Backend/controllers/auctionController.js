const Auction = require("../models/auctionModel");
const { CustomError } = require("../utils/errors");
const { asyncHandler } = require("../utils/handlers");
const jwt = require("jsonwebtoken");

/**
 * ROUTE HANDLERS
 */
exports.getAllAuction = asyncHandler(async function (req, res, next) {
  // get all auctions from collection
  const _auction = await Auction.find().populate("bids");

  /** 
  console.log(
    jwt.verify(
      "ya29.a0AX9GBdXPGvuIGk4BzFOwDihLiOYAvC67IQAuoVs71pgsm87Hl2bgpIWJ8H-DrOCNzQCnJ-H1yr3XUFNqFb2sHCMu38QUmRvoMlUa1a_7hlRdhQyohrZD4sK4w13ZOowtO9DEvHS_uAQPrfwKAqUOiJYcaHoAaCgYKAR8SARASFQHUCsbCaciv6gKpqh19m2IALDzoew0163",
      "secret"
    )
  );
  */

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
  const _auction = await Auction.findById(req.params.id).select("-__v");

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
  res
    .status(500)
    .json({
      status: "error",
      message: "TODO",
    })
    .end();
});
