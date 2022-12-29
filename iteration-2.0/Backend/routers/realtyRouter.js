const express = require("express");
const realtyController = require("../controllers/realtyController");

const router = express.Router();

/**
 * Routes middleware
 */
// TODO : router.route("/favorite/:id").post(realtyController.favoriteRealty);
router.route("/").get(realtyController.getAllRealty);

router.route("/:id").get(realtyController.getRealty);

module.exports = router;
