const express = require("express");
const auctionsController = require("../controllers/auctionsController");

const router = express.Router();

/**
 * routes middleware
 */
router
  .route("/")
  .get(auctionsController.getAllAuctions)
  .post(auctionsController.createNewAuction);

router
  .route("/:id")
  .get(auctionsController.getAuction)
  .patch(auctionsController.updateAuction);

module.exports = router;
