const User = require("../models/userModel");
const { setupResponse } = require("./../utils/utils");
const {
  asyncHandler,
  createOne,
  readOne,
  readAll,
  updateOne,
  deleteOne,
} = require("../utils/handlers");

/** specific-purpose route handlers */
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

  setupResponse(res, 200, _updatedUser);
});

exports.deleteCurrentUser = asyncHandler(async function (req, res, next) {
  // get user from collection and set active to false
  await User.findByIdAndUpdate(req.user.id, { status: "inactive" });

  setupResponse(res, 200);
});
//////////////////////////////////////////////////////////////////

/** general purpose route handlers */
exports.createUser = createOne(User);
exports.readUser = readOne(User);
exports.readAllUsers = readAll(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
