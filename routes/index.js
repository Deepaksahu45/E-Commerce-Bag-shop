const express = require("express");
const router = express.Router();
const isloggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const usermodel = require("../models/usermodel");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isloggedIn, async (req, res) => {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success, loggedin: true });
});

router.get("/cart", isloggedIn, async (req, res) => {
  let user = await usermodel
    .findOne({
      email: req.user.email,
    })
    .populate("cart");

  const bill = Number(user.cart[0].price) - Number(user.cart[0].discount) + 20;
  res.render("cart", { user, bill });
});

router.get("/addtocart/:id", isloggedIn, async (req, res) => {
  const user = await usermodel.findOne({ email: req.user.email });

  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/shop");
  }

  user.cart.push(req.params.id);
  await user.save();

  req.flash("success", "Product added to cart");
  res.redirect("/shop");
});

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

module.exports = router;
