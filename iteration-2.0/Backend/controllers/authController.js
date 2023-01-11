const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./../models/userModel");
const { CustomError } = require("./../utils/errors");
const { asyncHandler } = require("./../utils/handlers");
const { jwtTokenGenerator, setupResponse } = require("./../utils/utils");

/**
 * username & password validation is done by next-auth
 *
 * 1. validate jwt from request
 * 2. if user not in database, create new user
 * 3. generate and embed new token in response
 */
exports.login = asyncHandler(async function (req, res, next) {
  // validate access_token from request
  const _accessToken = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    { headers: { authorization: req.headers.authorization } }
  ).then((response) => response.json());

  if (!_accessToken.email_verified)
    return next(new CustomError("Invalid token", 400));

  // set user credentials
  let _statusCode = 200;
  let _user = await User.findOne({ email: _accessToken.email });
  if (!_user) {
    _statusCode = 201;
    _user = await User.create({
      name: _accessToken.name,
      email: _accessToken.email,
      avatar: _accessToken.picture,
    });
  }

  // set new token
  const _token = jwtTokenGenerator(_user._id);
  const _options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") _options.secure = true;

  res.cookie("jwt", _token, _options);

  setupResponse(res, _statusCode);
});
////////////////////////////////////////////////////////////////////////

/**
 * authentication middleware : handles authentication before routes access
 *
 * TODO : validate Google OAuth token
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
    .select("+nationalId")
    .select("+mobile")
    .select("+status")
    .select("+role");

  if (!_user || _user.status === "inactive") return next(_error);

  // attach user data to request
  req.user = _user;
  next();
});

/**
 * authorization middleware : handles authorization to specific routes by certain users eg admin
 *
 * PASSING ARGUMENTS INTO MIDDLEWARE FUNCTIONS
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
