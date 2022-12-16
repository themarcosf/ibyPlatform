const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

/**
 * routes middleware
 */
router.route("/").post(userController.userLogin);

router.route("/balanceOf").get(userController.balanceOf);

router.route("/:id").get(userController.userContracts);

module.exports = router;
