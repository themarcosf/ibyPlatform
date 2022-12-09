const express = require("express");
const realtyController = require("./../controllers/realtyController");

const router = express.Router();

/**
 * EXAMPLE: param middleware
 * router.param("name", [callback function (req, res, next, val)] );
 */

/**
 * routes middleware
 */
router
  .route("/")
  .get(realtyController.getAllRealty)
  .post(realtyController.createNewRealty);

router.route("/:id").get(realtyController.getRealty);
// .patch(realtyController.updateRealty);

module.exports = router;
