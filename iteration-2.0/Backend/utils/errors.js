/**
 * distinguish operational error from other unknown errors
 */
class CustomError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
    this.status = String(this.statusCode).startsWith(4) ? "fail" : "error";
    this.isOperational = true;
  }
}
//////////////////////////////////////////////////////////////////

/**
 * handle uncaught (sync) exceptions and (async) rejections
 */
const uncaughtErrorHandler = function (err, server) {
  console.log(err.name, err.message);
  if (server) server.close();
  process.exit(-1);
};
//////////////////////////////////////////////////////////////////

module.exports = { CustomError, uncaughtErrorHandler };
