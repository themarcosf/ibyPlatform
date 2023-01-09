const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// @notice routes middleware
router.post("/login", authController.login);

router
  .route("/")
  .get(
    authController.authentication,
    authController.authorization("admin"),
    userController.readAllUsers
  )
  .post(userController.createUser);

// @notice authentication required for all routes
router.use(authController.authentication);

router
  .route("/currentUser")
  .patch(userController.updateCurrentUser)
  .delete(userController.deleteCurrentUser);

router.get("/me", userController.readCurrentUser, userController.readUser);

// @notice authorization required for all routes
router.use(authController.authorization("admin"));

router
  .route("/:id")
  .get(userController.readUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
