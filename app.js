const express = require("express");
const morgan = require("morgan");
const { CustomError } = require("./utils/lib");
const errController = require("./controllers/errController");
const realtyRouter = require("./routers/realtyRouter");
////////////////////////////////////////////////////////////////////////

const app = express();

/**
 * general purpose middleware
 */
app.use(express.json()); // parses request body
app.use(express.static(`${__dirname}/public`)); //serves static files
if (process.env.NODE_ENV === "development") app.use(morgan("dev")); // dev helper - http requests logger

/**
 * routers middleware
 */
app.use("/api/v1/realty", realtyRouter);
app.all("/*", (req, res, next) =>
  next(new CustomError(`Invalid path: ${req.originalUrl}`, 404))
);

/**
 * global error handling middleware
 */
app.use(errController);

module.exports = app;