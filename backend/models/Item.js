const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  marked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Item', ItemSchema);
