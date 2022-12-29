const express = require("express");
const bidController = require("../controllers/bidController");

const router = express.Router();

/**
 * Routes middleware
 */
router.route("/").get(bidController.getAllBid);

module.exports = router;
