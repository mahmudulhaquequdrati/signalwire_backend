const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide an email");
    }
    if (!password) {
      throw new Error("Please provide a password. Password can not be empty!");
    }
    // check exasting user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    // Check password
    const passwordFromDB = user.password;

    if (passwordFromDB === password) {
      res.status(200).json({
        message: "Welcome back",
        data: {
          accessToken: Math.ceil(Math.random() * 100000000),
          user: {
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
      });
    } else {
      res.status(400).json({
        errorMessage: "Password does not match",
      });
    }

    // response
  } catch (err) {
    res.status(403).json({
      errorMessage: "There was a problem login the user",
      error: err.message,
    });
  }
};

module.exports = {
  loginUser,
};
