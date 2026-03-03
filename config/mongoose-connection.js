const mongoose = require("mongoose");
const dbgr = require("debug")("development:db");
const config = require("config");

// mongoose
//   .connect(`${config.get("MONGODB_URL")}/ecommerce`)
//   .then(function () {
//     dbgr("connected");
//   })
//   .catch(function (err) {
//     dbgr(err);
//   });

mongoose
  .connect(`${config.get("MONGODB_URL")}/ecommerce`)
  .then(() => {
    console.log("MongoDB connected (console.log)");
    dbgr("MongoDB connected (debug)");
  })
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
