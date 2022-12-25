const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const errController = require("./controllers/errController");
const { CustomError } = require("./utils/errors");
////////////////////////////////////////////////////////////////////////

const app = express();

/**
 * general purpose global middleware
 *
 * TODO : data sanitization against noSQL query injection
 * TODO : data sanitization against XSS
 */

// HTTP requests logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// set security HTTP headers
app.use(helmet());

// parse and control maximum request body
app.use(express.json({ limit: "100kb" }));

// block DoS attacks by counting number of requests by single IP (eg 100 per hour)
app.use(
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "IP blocked",
  })
);

/**
 * routers middleware
 */
app.all("/*", (req, res, next) =>
  next(new CustomError(`Invalid path: ${req.originalUrl}`, 404))
);

/**
 * global error handling middleware
 */
app.use(errController);
////////////////////////////////////////////////////////////////////////

module.exports = app;
