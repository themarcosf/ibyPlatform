const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./../models/userModel");
const { CustomError } = require("./../utils/errors");
const { asyncHandler } = require("./../utils/handlers");
const { setupResponse } = require("./../utils/utils");

/**
 * username & password validation is done by next-auth
 *
 * 1. validate jwt from request
 * 2. check if user exists in database
 * 3. if new user, save basic information
 */
exports.login = asyncHandler(async function (req, res, next) {
  /** 
  const { email } = req.body;

  // validate email from request
  if (!email) return next(new CustomError("Email provided", 400));

  // set user credentials
  let _user = await User.findOne({ email });
  if (!_user) _user = await User.create(req.body);
   */

  setupResponse(res, 200, "success", req.body);
});
////////////////////////////////////////////////////////////////////////

/**
 * authentication middleware : handles authentication before routes access
 * authorization middleware : handles authorization to specific routes by certain users eg admin
 *
 * PROMISIFY (fn) : node built-in method to avoid callback pattern in async/await functions
 */
exports.authentication = asyncHandler(async function (req, res, next) {
  next();
});

/**
 * PASSING ARGUMENTS INTO MIDDLEWARE FUNCTIONS
 *
 * 1. create wrapper function that returns middleware function
 * 2. middleware gets access to wrapper function parameters due to closure
 */
exports.authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new CustomError("Authorization failed", 403));
    next();
  };
};
////////////////////////////////////////////////////////////////////////
