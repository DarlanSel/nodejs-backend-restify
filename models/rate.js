const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

RateSchema.index({ productId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Rate', RateSchema);;
