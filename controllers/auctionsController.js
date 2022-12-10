const { QueryHelpers, CustomError, asyncHandler } = require("../utils/lib");
const Auction = require("../models/auctionsModel");
////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */
exports.getAllAuctions = asyncHandler(async function (req, res, next) {
  const query = new QueryHelpers(req.query, Auction.find())
    .filter()
    .sort()
    .fields()
    .paginate();
  const _auctions = await query.mongooseQuery;

  res
    .status(200)
    .json({
      status: "success",
      results: _auctions.length,
      data: { _auctions },
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
      data: { _auction },
    })
    .end();
});

exports.createNewAuction = asyncHandler(async function (req, res, next) {
  const _auction = await Auction.create(req.body);

  res
    .status(201)
    .json({
      status: "Success",
      data: { auction: _auction },
    })
    .end();
});

exports.updateAuction = asyncHandler(async function (req, res, next) {
  const _auction = await Auction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!_auction) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "Success",
      data: { auction: _auction },
    })
    .end();
});

////////////////////////////////////////////////////////
