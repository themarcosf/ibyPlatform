const { asyncHandler } = require("../utils/lib");
const User = require("../models/userModel");
////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */

exports.getUser = asyncHandler(async function (req, res, next) {
  const _user = await User.findById(req.params.id);

  res
    .status(200)
    .json({
      status: "success",
      data: { _user },
    })
    .end();
});

exports.createNewUser = asyncHandler(async function (req, res, next) {
  const _user = await User.create(req.body);

  res
    .status(201)
    .json({
      status: "Success",
      data: { user: _user },
    })
    .end();
});

////////////////////////////////////////////////////////
