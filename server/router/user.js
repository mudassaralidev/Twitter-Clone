const router = require("express").Router();
const {
  signUp,
  LoggedIn,
  logIn,
  logOut
} = require("../controllers/user");

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/loggedIn", LoggedIn);

module.exports = router;