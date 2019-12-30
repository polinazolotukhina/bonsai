const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  belongsToBrand: Number,
  id: String,
  name: String,
  price: Number,
  quantity: Number,
  description: String,
  color: String,
  size: String,
  quantity: Number,
  image: String,
  quantityToBuy: {
    type: Number,
    default: 1
  }
});

// module.exports = mongoose.model("Product", ProductSchema);
module.exports = ProductSchema;
