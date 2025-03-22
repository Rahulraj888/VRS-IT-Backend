const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  background: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  processor: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
