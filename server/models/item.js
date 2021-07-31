const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  priority: String,
  description: String,
  quantity: Number,
  unitPrice: Number,
  unitPriceCurrency: String,
  isPurchased: Boolean,
  datePurchased: String,
  url: String,
  image: String,
  vendorId: String,
});

module.exports = mongoose.model("Item", itemSchema);
