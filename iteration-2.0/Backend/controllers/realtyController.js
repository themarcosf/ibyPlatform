const Auction = require("./../models/auctionModel");
const Realty = require("./../models/realtyModel");
const { monthDiff } = require("./../utils/utils");
const { CustomError } = require("./../utils/errors");
const { asyncHandler } = require("./../utils/handlers");

/**
 * ROUTE HANDLERS
 */
exports.getAllRealty = asyncHandler(async function (req, res, next) {
  const realty_ = await Realty.find();
  const _auction = await Auction.find();
  const _realty = realty_.map((el) => {
    for (let i = 0; i < _auction.length; i++) {
      if (el.id === _auction[i].realtyId) {
        const _currentValue = _auction[i].currentValue;
        const _leaseEndDate = _auction[i].leaseEndDate;
        const _leaseBeginDate = _auction[i].leaseBeginDate;
        const _monthDiff = monthDiff(_leaseBeginDate, _leaseEndDate);

        return JSON.parse(
          JSON.stringify(el)
            .concat(
              JSON.stringify({
                costPerMonth: _currentValue / _monthDiff,
              })
            )
            .replace("}{", ",")
        );
      }
    }
  });

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
