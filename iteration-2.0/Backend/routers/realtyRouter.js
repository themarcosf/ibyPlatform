const express = require("express");
const favoriteRouter = require("./favoriteRouter");
const realtyController = require("../controllers/realtyController");

const router = express.Router();

/**
 * Routes middleware
 */

// nested-routes middleware
router.use("/:realtyId/favorites", favoriteRouter);

// general routes middleware
router.route("/").get(realtyController.readAllRealty).post(
  // authController.authenticate,
  // authController.authorization("owner", "admin"),
  realtyController.createRealty
);

router
  .route("/:id")
  .get(realtyController.readRealty)
  .patch(
    // authController.authenticate,
    // authController.authorization("owner", "admin"),
    realtyController.updateRealty
  )
  .delete(
    // authController.authenticate,
    // authController.authorization("admin"),
    realtyController.deleteRealty
  );

module.exports = router;
