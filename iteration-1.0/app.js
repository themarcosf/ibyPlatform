const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const { CustomError } = require("./utils/lib");
const errController = require("./controllers/errController");
const realtyRouter = require("./routers/realtyRouter");
const auctionsRouter = require("./routers/auctionsRouter");
const userRouter = require("./routers/userRouter");
////////////////////////////////////////////////////////////////////////

const app = express();

/**
 * general purpose middleware
 */

app.use(express.json()); // parses request body
app.use(cors());
app.use(express.static(`${__dirname}/public`)); //serves static files
if (process.env.NODE_ENV === "development") app.use(morgan("dev")); // dev helper - http requests logger

/**
 * routers middleware
 */
app.use("/api/v1/realty", realtyRouter);
app.use("/api/v1/auctions", auctionsRouter);
app.use("/api/v1/users", userRouter);
app.all("/*", (req, res, next) =>
  next(new CustomError(`Invalid path: ${req.originalUrl}`, 404))
);

/**
 * global error handling middleware
 */
app.use(errController);

module.exports = app;
