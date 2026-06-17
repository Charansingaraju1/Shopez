const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  email: String,
  stockName: String,
  price: Number,
  market: String,
});

module.exports = mongoose.model(
  "Portfolio",
  PortfolioSchema
);