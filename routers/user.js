const { registerUser, loginUser, logoutUser } = require("../controllers/user");
const express = require("express");
const router = express.Router();

router.post("/ms15/sign/6/up/sm", registerUser);
router.post("/ms15/log/6/in/sm", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
