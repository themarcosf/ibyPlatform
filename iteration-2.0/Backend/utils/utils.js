const jwt = require("jsonwebtoken");

/**
 * @notice calculate difference in months between two dates
 *
 * @param {Date} d1 : begin date
 * @param {Date} d2 : end date
 * @returns {Number} : difference in round months
 */
exports.monthDiff = function (d1, d2) {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : ++months;
};
////////////////////////////////////////////////////////////////////////

exports.setupResponse = function (_user, _statusCode, _res) {
  const _token = jwt.sign({ id: _user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  const _options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") _options.secure = true;

  _res.cookie("jwt", _token, _options);

  return _res
    .status(_statusCode)
    .json({
      status: "success",
      data: {
        name: _user.name,
        email: _user.email,
      },
    })
    .end();
};
////////////////////////////////////////////////////////////////////////
