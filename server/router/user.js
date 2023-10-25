const router = require("express").Router();
const {
  signUp,
  LoggedIn,
  logIn,
  logOut,
  resetPasswordEmail,
  resetPassword
} = require("../controllers/user");

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/loggedIn", LoggedIn);
router.post("/reset-password", resetPasswordEmail);
router.post("/:id/reset-password/:token", resetPassword);

module.exports = router;