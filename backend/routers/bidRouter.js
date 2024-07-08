const express = require("express");
const bidController = require("../../controllers/bidController");
const authController = require("../../controllers/authController");

const router = express.Router();

// @notice authentication required for all routes
router.use(authController.authentication);

/** Routes middleware */
router.route("/").get(bidController.getAllBid).post(bidController.createBid);

module.exports = router;
