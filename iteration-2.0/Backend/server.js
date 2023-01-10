require("dotenv").config({ path: "./../../config.env" });
const app = require("./app");
const mongoose = require("mongoose");
const { uncaughtErrorHandler } = require("./utils/errors");
//////////////////////////////////////////////////////////////////

/**
 * unhandled (sync) exceptions handler
 */
process.on("uncaughtException", (err) => uncaughtErrorHandler(err));
//////////////////////////////////////////////////////////////////

/**
 * database config
 *
 * strict option (enabled by default) : ensures that values not specified in schema do not get saved to db
 * strictQuery=false : avoid strict mode for query filters because empty query filters cause Mongoose
 *                      to return all documents in the model, which can cause data leaks
 */

// local database
// const DB = process.env.DATABASE_LOCAL;

// remote database
const DB = process.env.DATABASE_REMOTE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .set("strictQuery", false)
  .connect(DB)
  .then((conn) => console.log(`DB connected to: ${conn.connections[0].name}`));
//////////////////////////////////////////////////////////////////

/**
 * server config
 */
const server = app.listen(
  process.env.PORT || 8000,
  process.env.HOST || "127.0.0.1",
  () => console.log(`Server running on port ${process.env.PORT}`)
);
//////////////////////////////////////////////////////////////////

/**
 * unhandled (async) rejections handler
 */
process.on("unhandledRejection", (err) => uncaughtErrorHandler(err, server));
