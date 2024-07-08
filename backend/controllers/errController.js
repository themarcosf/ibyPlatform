/**
 * OPPORTUNITIES FOR IMPROVEMENT
 *
 * better descriptions for mongoDB and mongoose errors
 * define different error severity levels eg low, medium, high, critical
 * email systems administrator about critical errors
 */

const devError = (err, res) =>
  res
    .status(err.statusCode)
    .json({
      // status: err.status, :: may be enabled
      operational: err.isOperational,
      stack: err.stack,
    })
    .end();

const prodError = (err, res) => {
  // operational errors from mongoDB and mongoose
  if (
    err.name === "CastError" ||
    err.name === "ValidationError" ||
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError" ||
    err.code === 11000
  )
    err.isOperational = true;

  err.isOperational
    ? res
        .status(err.statusCode)
        .json({
          status: err.status,
          operational: err.isOperational,
          message: err.message,
        })
        .end()
    : unknownError(err, res);
};

const unknownError = (err, res) => {
  console.error(`💥 Unknown Error: ${err}`);
  return res
    .status(500)
    .json({
      status: "Error",
      message: "Unknown error",
    })
    .end();
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  process.env.NODE_ENV === "development"
    ? devError(err, res)
    : prodError(err, res);
};
