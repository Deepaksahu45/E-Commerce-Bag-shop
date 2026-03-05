const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const usersRouter = require("./routes/usersRouter");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");
const flash = require("connect-flash");
const expressSession = require("express-session");
const isLoggedIn = require("./middlewares/isLoggedIn");

require("dotenv").config(); // to use this must download dotenv package

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(flash());

app.use("/", indexRouter);
app.use("/owners", ownersRouter); // this is a routes for owner model
app.use("/users", usersRouter); // this is a routes for user model
app.use("/products", productsRouter); // this is a routes for product model

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
