const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['farmer','admin'], default: 'farmer' },
  farmFields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Field' }]
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
