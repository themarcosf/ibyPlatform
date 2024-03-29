require("dotenv").config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");
const { uncaughtErrorHandler } = require("./utils/errors");
const { eventTransferToken } = require("./controllers/auctionController");
//////////////////////////////////////////////////////////////////

/** unhandled (sync) exceptions handler */
process.on("uncaughtException", (err) => uncaughtErrorHandler(err));
//////////////////////////////////////////////////////////////////

/**
 * database config
 *
 * strict option (enabled by default) : ensures that values not specified in schema do not get saved to db
 * strictQuery=false : avoid strict mode for query filters because empty query filters cause Mongoose
 *                      to return all documents in the model, which can cause data leaks
 *
 * eventTransferToken : set up server to listen to token transfers and update auction to inactive
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
  .then((conn) => console.log(`DB connected to: ${conn.connections[0].name}`))
  .then(() => eventTransferToken());
//////////////////////////////////////////////////////////////////

/** server config */
const server = app.listen(process.env.PORT || 8000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
//////////////////////////////////////////////////////////////////

/** unhandled (async) rejections handler */
process.on("unhandledRejection", (err) => uncaughtErrorHandler(err, server));
//////////////////////////////////////////////////////////////////

/** SIGTERM signal : dyno will shut down in 30 seconds */
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Server shutting down.");
  server.close(() => {
    console.log("Server terminated.");
  });
});
