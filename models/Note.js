const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  content: { type: String, default: '' },
  charCount: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
});

module.exports = mongoose.model('Note', noteSchema);
