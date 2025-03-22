require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = async () =>
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = dbConnection;
