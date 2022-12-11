const { asyncHandler } = require("../utils/lib");
const User = require("../models/userModel");
////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */

exports.userLogin = asyncHandler(async function (req, res, next) {
  const _allUsers = await User.find();

  const [_currentUser] = _allUsers.filter((el) => el.email === req.body.email);
  if (_currentUser) {
    if (_currentUser.password === req.body.password) {
      res
        .status(200)
        .json({
          status: "Success",
          authorized: true,
        })
        .end();
    } else {
      return next(new CustomError("Invalid password", 400));
    }
  } else {
    const _user = await User.create(req.body);

    res
      .status(201)
      .json({
        status: "Success",
        data: { user: _user },
      })
      .end();
  }
});

////////////////////////////////////////////////////////
