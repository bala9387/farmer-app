const mongoose = require('mongoose');
const SensorSchema = new mongoose.Schema({
  fieldId: { type: mongoose.Schema.Types.ObjectId, ref: 'Field' },
  timestamp: { type: Date, default: Date.now },
  type: String, // 'pH','moisture','temp'...
  value: Number
});
module.exports = mongoose.model('SensorReading', SensorSchema);
