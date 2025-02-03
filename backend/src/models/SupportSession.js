const mongoose = require('mongoose');

const SupportSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [
    {
      role: { type: String, enum: ['user', 'assistant'], required: true },
      text: { type: String, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('SupportSession', SupportSessionSchema);