const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

/**
 * username & password validation is done by next-auth
 * user-specific routes middleware
 */
router.post("/login", authController.login);

// @notice authentication required for all routes
// router.use(authController.authentication);

router
  .route("/currentUser")
  .patch(userController.updateCurrentUser)
  .delete(userController.deleteCurrentUser);

router.get("/me", userController.readCurrentUser, userController.readUser);
//////////////////////////////////////////////////////////////////

/** general purpose routes middleware */

// @notice authorization required for all routes
// router.use(authController.authorization("admin"));

router
  .route("/")
  .get(userController.readAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.readUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
