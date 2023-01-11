const Favorite = require("../models/favoriteModel");
const { asyncHandler } = require("../utils/handlers");

/**
 * specific-purpose route handlers
 */
exports.toggleFavorite = asyncHandler(async function (req, res, next) {
  let _userId;
  if (req.user) _userId = req.user.id;
  if (req.body.userId) _userId = req.body.userId;

  let _realtyId;
  if (req.params.realtyId) _realtyId = req.params.realtyId;
  if (req.body.realtyId) _realtyId = req.body.realtyId;

  const [_favorite] = await Favorite.find({
    userId: _userId,
    realtyId: _realtyId,
  });

  let _data;
  if (!_favorite) {
    _data = await Favorite.create({ userId: _userId, realtyId: _realtyId });
  } else {
    _data = await Favorite.findByIdAndUpdate(
      _favorite.id,
      {
        status: !_favorite.status,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res
    .status(200)
    .json({
      status: "success",
      data: _data,
    })
    .end();
});
