const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const rateLimit = require("express-rate-limit");
const { CustomError } = require("./utils/errors");
const bidRouter = require("./routers/bidRouter");
const userRouter = require("./routers/userRouter");
const realtyRouter = require("./routers/realtyRouter");
const auctionRouter = require("./routers/auctionRouter");
const errController = require("./controllers/errController");
////////////////////////////////////////////////////////////////////////

const app = express();

/**
 * general purpose global middleware
 *
 * TODO : data sanitization against noSQL query injection eg mongoSanitize
 * TODO : data sanitization against XSS eg xss or xss-clean
 * TODO : prevent http parameter pollution eg hpp
 */

// HTTP requests logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// set security HTTP headers
app.use(helmet());

// cross origin resource sharing (cors)
app.use(cors());

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
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/realty", realtyRouter);
app.use("/api/v1/auction", auctionRouter);
app.all("/*", (req, res, next) =>
  next(new CustomError(`Invalid path: ${req.originalUrl}`, 404))
);

/**
 * global error handling middleware
 */
app.use(errController);
////////////////////////////////////////////////////////////////////////

module.exports = app;
