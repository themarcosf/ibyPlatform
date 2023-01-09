const User = require("../models/userModel");
const { CustomError } = require("../utils/errors");
const {
  asyncHandler,
  createOne,
  readOne,
  readAll,
  updateOne,
  deleteOne,
} = require("../utils/handlers");

/**
 * ROUTE HANDLERS
 */
exports.readCurrentUser = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateCurrentUser = asyncHandler(async function (req, res, next) {
  // update user document
  const _updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json({
      status: "success",
      data: {
        document: _updatedUser,
      },
    })
    .end();
});

exports.deleteCurrentUser = asyncHandler(async function (req, res, next) {
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

exports.createUser = createOne(User);
exports.readUser = readOne(User);
exports.readAllUsers = readAll(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
