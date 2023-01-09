const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./../models/userModel");
const { CustomError } = require("./../utils/errors");
const { asyncHandler } = require("./../utils/handlers");

/**
 * login middleware :
 * validation is done in the function
 * and a JWT token is returned to the client
 */

// TODO : some form of validation provided by Google
exports.login = asyncHandler(async function (req, res, next) {
  const { email } = req.body;

  // validate email from request
  if (!email) return next(new CustomError("Email provided", 400));

  // set user credentials
  let _user = await User.findOne({ email });
  if (!_user) _user = await User.create(req.body);

  setupResponse(_user, 200, res);
});
////////////////////////////////////////////////////////////////////////

/**
 * authentication middleware : handles authentication before routes access
 * authorization middleware : handles authorization to specific routes by certain users eg admin
 *
 * PROMISIFY (fn) : node built-in method to avoid callback pattern in async/await functions
 */
exports.authentication = asyncHandler(async function (req, res, next) {
  const _error = new CustomError("Authentication failed", 401);

  // check headers for authorization token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) return next(_error);

  const token = authHeader.split(" ")[1];

  // validate token integrity
  const _payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // verify user status
  const _user = await User.findById(_payload.id)
    .select("+status")
    .select("+role");

  if (!_user || _user.status === "inactive") return next(_error);

  // attach user data to request
  req.user = _user;
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
