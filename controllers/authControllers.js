const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;

    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash("error", "User already exists");
      return res.redirect("/");
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        req.flash("error", "Something went wrong");
        return res.redirect("/");
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          req.flash("error", "Something went wrong");
          return res.redirect("/");
        }

        let user = await userModel.create({
          email,
          password: hash,
          fullname,
        });

        let token = generateToken(user);
        res.cookie("token", token);

        req.flash("success", "Registered successfully");
        res.redirect("/shop"); // or "/" if you want
      });
    });
  } catch (err) {
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        return res.redirect("/shop");
      } else {
        req.flash("error", "Invalid email or password");
        return res.redirect("/");
      }
    });
  } catch (err) {
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
