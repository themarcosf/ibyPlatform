/**
 * handles uncaught (sync) exceptions and (async) rejections
 */
const uncaughtErrorHandler = function (err, server) {
  if (process.env.NODE_ENV === "development")
    console.log("Origin: Backend/utils/utils.js:uncaughtErrorHandler()");

  console.log(err.name, err.message);
  if (server) server.close();
  process.exit(-1);
};
//////////////////////////////////////////////////////////////////

module.exports = { uncaughtErrorHandler };
