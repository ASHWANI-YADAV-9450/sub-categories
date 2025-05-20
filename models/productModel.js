// models/productModel.js

const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  name: String,
  children: [this]  // recursive nesting
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [optionSchema],
  attributes: { type: Object } // key-value pairs for filtering
});

module.exports = mongoose.model("Product", productSchema);

