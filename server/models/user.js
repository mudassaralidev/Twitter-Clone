const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: "string",
    required: [true, "Name is required"],
    minlength: [3, "Name is too short"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [6, "User Name is too short"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "Email Should be valid"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [2, "password is too short"],
  },
  prof_pic: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  bio: {
    type: String,
  },
  followings: [
    {
      type: String,
    },
  ],
  followers: [
    {
      type: String,
    },
  ],
  verfied: { type: Boolean, default: false },
});

userSchema.plugin(uniqueValidator, {
  message: "{PATH} has been already in use.",
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.username = this.username.replace(/ /g, "");
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.SECRECT_TOKEN, {
    expiresIn: process.env.TOKEN_EXPIREY,
  });
};

userSchema.methods.comaprePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};



const User = mongoose.model("User", userSchema);

module.exports = User;