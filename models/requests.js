const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  inputImageUrl: { type: String, required: true },
  outputImageUrl: { type: String },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
