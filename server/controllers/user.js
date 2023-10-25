const User = require("../models/user");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const badRequest = require("../middlewares/badRequestError");
const crypto = require("crypto");

const settingCookies = (res, token, maxAge) => {
  res.cookie("token", token, {
    path: "/",
    maxAge: maxAge ? 0 : 86400 * 1000,
    http: true,
    sameSite: "lax",
  });
};

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
  console.log(token)
  settingCookies(res, token, false);
  res.send("Successfully logged in");
};

const LoggedIn = (req, res) => {
  const token = req?.cookies?.token;
  if (!token) return res.json(false);
  jwt.verify(token, process.env.SECRECT_TOKEN);
  res.send(true);
};

const logOut = (req, res) => {
  settingCookies(res, req.cookies.token, true);
  res.send("logout");
};

const resetPasswordEmail = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.send("User does not exist. Signup yourself");
  }
  if (user && !user.verfied) {
    return res.send(
      "Confirmation mail has been sent to your email. verify yourself"
    );
  } else {
    const token = await Token.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    const url = `${process.env.BASE_URL}users/${user._id}/reset-password/${token.token}`;
    const text = `<h2>Reset Your Password</h2> <p>by clicking on below link</p> <a href=${url}>Reset your password<a>`;
    await sendEmail(user.email, "Reset Passwrod", text);
    res.send("Check your email to reset password");
  }
};

const resetPassword = async (req, res) => {
  const { password, rePassword } = req.body;
  if (!password || !rePassword) {
    throw new badRequest("Please fill required fields");
  }
  if (password !== rePassword) {
    throw new badRequest("Password does not match");
  }
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (token) {
      user.password = password || user.password;
      await user.save();
      await token.remove();
      return res.send("Password changed successfully");
    } else {
      throw new badRequest(
        "Link has been expired, get link by providing your email"
      );
    }
  } else {
    return res.send("Password can not be change");
  }
};

module.exports = {
  signUp,
  LoggedIn,
  logIn,
  logOut,
  resetPassword,
  resetPasswordEmail
};