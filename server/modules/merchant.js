const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = require("./product");

const MerchantSchema = new Schema({
  index: Number,
  guid: String,
  logo: String,
  dateCreated: String,
  publishedState: Boolean,
  brands: [String],
  merchant: String,
  products: [ProductSchema],
  commissionFee: String,
  contactEmail: String,
  phone: String,
  address: String,
  publishedDate: String,
  publishedBy: {
    userId: String
  },
  companyDescription: String
});

module.exports = mongoose.model("Merchant", MerchantSchema);
