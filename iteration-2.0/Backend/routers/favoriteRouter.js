const express = require("express");
const favoriteController = require("../controllers/favoriteController");

const router = express.Router();

/**
 * Routes middleware
 */
router.route("/").post(favoriteController.createFavorite);

module.exports = router;
