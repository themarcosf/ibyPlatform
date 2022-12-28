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

  // if not in use create new user
  let _user = _users.find((el) => el.email === _body.email);

  if (!_user) _user = await User.create(_body);

  // return user object
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

exports.updateUser = asyncHandler(async function (req, res, next) {
  // get and update user from collection
  const _user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // if user not found return new error
  if (!_user) return next(new CustomError("Id not found", 404));

  // end request
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

exports.deleteUser = asyncHandler(async function (req, res, next) {
  // get user from collection
  const _user = await User.findById(req.params.id);

  // if user not found return error
  if (!_user) return next(new CustomError("Id not found", 404));

  // if user found set active to false
  _user.active = false;
  _user.save();

  // end request
  res.status(200).json({ status: "success", data: null }).end();
});
