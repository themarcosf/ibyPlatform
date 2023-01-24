const express = require("express");
const favoriteController = require("../controllers/favoriteController");

// @dev mergeParms default: false
const router = express.Router({ mergeParams: true });

/** specific-purpose routes middleware */
router.route("/toggle").post(favoriteController.toggleFavorite);

module.exports = router;
