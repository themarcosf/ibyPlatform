const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

/**
 * routes middleware
 */
router.route("/").post(userController.createNewUser);

router.route("/:id").get(userController.getUser);

module.exports = router;
