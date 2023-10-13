const User = require("../models/user");
const jwt = require("jsonwebtoken");
const badRequest = require("../middlewares/badRequestError");


const signUp = async (req, res) => {
  const data = req.body;

  const { name, username, email, password, rePassword } = data;
  if (!username || !name || !email || !password || !rePassword) {
    throw new badRequest(" Please fill out required fields");
  }
  const userCheck = await User.findOne({ email });
  if (userCheck) {
    return res.send("User has already exist with the provided email");
  }
  if (password != rePassword) {
    throw new badRequest("Password does not match");
  }
  await User.create(data);

  res.status(200).json("User has been signed up successfully");
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new badRequest("Please enter all required fields");
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new badRequest("Please sign up before getting log in");
  }

  const correctPassword = await user.comaprePassword(req.body.password);
  if (!correctPassword) {
    throw new badRequest("Email or password is incorrect");
  }
  const token = user.createJWT();
  settingCookies(res, token, false);
  res.send("Successfully logged in");
};

const LoggedIn = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json(false);
  jwt.verify(token, process.env.SECRECT_TOKEN);
  res.send(true);
};

const logOut = (req, res) => {
  settingCookies(res, req.cookies.token, true);
  res.send("logout");
};

module.exports = {
  signUp,
  LoggedIn,
  logIn,
  logOut,
};