const express = require("express");
const auctionController = require("./../controllers/auctionController");

const router = express.Router();

/**
 * Routes middleware
 */
router.route("/").get(auctionController.getAllAuction);

router.route("/:id").get(auctionController.getAuction);

module.exports = router;
