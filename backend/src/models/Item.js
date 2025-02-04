const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  quantity:    { type: Number, default: 1 },
  images:      { type: [String] },
  tags:        { type: [String], default: [] },
  sellerId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Item', ItemSchema);