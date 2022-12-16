const express = require("express");
const realtyController = require("./../controllers/realtyController");

const router = express.Router();

/**
 * routes middleware
 */
router
  .route("/")
  .get(realtyController.getAllRealty)
  .post(realtyController.createNewRealty);

router
  .route("/:id")
  .get(realtyController.getRealty)
  .patch(realtyController.updateRealty);

module.exports = router;
