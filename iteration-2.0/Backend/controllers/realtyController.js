const Realty = require("./../models/realtyModel");
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
