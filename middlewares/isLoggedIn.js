const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "Please login first");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password"); // yeh password nhi show krna hai toh -password likhna hoga
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "Please login first");
    res.redirect("/");
  }
};
