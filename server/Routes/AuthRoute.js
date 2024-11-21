const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

//user verification
router.post("/", userVerification);
//signup
router.post("/signup", Signup);
//login
router.post("/login", Login);

module.exports = router;
