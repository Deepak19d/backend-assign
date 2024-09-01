const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['input', 'output'], required: true },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
