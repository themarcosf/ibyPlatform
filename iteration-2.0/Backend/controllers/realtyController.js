const Auction = require("./../models/auctionModel");
const Realty = require("./../models/realtyModel");
const { CustomError } = require("./../utils/errors");
const { asyncHandler } = require("./../utils/handlers");

/**
 * ROUTE HANDLERS
 */
exports.getAllRealty = asyncHandler(async function (req, res, next) {
  const _realty = await Realty.find();

  res
    .status(200)
    .json({
      status: "success",
      results: _realty.length,
      data: {
        realty: _realty,
      },
    })
    .end();
});

exports.getRealty = asyncHandler(async function (req, res, next) {
  const _realty = await Realty.findById(req.params.id);
  const _auction = await Auction.find();
  const _currentAuction = _auction.find(
    (el) => el.realtyId === req.params.id && el.active === true
  );

  if (!_realty) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: {
        realty: _realty,
        auction: _currentAuction,
      },
    })
    .end();
});
