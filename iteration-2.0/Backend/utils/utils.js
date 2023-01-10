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

/**
 * @notice template for generic API responses
 *
 * @param {Object} _res
 * @param {Number} _statusCode
 * @param {String} _status
 * @param {Object} _data
 */
exports.setupResponse = function (_res, _statusCode, _status, _data, _message) {
  let data = { status: _status };
  if (_data) data.data = _data;
  if (_message) data.message = _message;

  return _res.status(_statusCode).json(data).end();
};
////////////////////////////////////////////////////////////////////////
