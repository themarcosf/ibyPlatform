const User = require("../models/userModel");
const { CustomError } = require("../utils/errors");
const { asyncHandler } = require("../utils/handlers");

/**
 * ROUTE HANDLERS
 */
exports.getUser = asyncHandler(async function (req, res, next) {
  const _user = await User.findById(req.params.id);

  if (!_user) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: {
        user: _user,
      },
    })
    .end();
});

exports.createUser = asyncHandler(async function (req, res, next) {
  // filter req body data
  const _body = {
    username: req.body.username,
    email: req.body.email,
  };

  // get entire users collection
  const _users = await User.find();

  // check if username or email in use
  const _checkUser = _users.find(
    (el) => el.username === _body.username || el.email === _body.email
  );

  if (_checkUser)
    return next(new CustomError("Username or email unavailable", 401));

  // create user
  const _user = await User.create(_body);

  res
    .status(200)
    .json({
      status: "success",
      data: {
        user: _user,
      },
    })
    .end();
});
