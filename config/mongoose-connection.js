const mongoose = require("mongoose");
const dbgr = require("debug")("development:db");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    dbgr("MongoDB connected");
  })
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
