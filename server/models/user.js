const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const uniqueValidator = require("mongoose-unique-validator");


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



const User = mongoose.model("User", userSchema);

module.exports = User;