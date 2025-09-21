const mongoose = require('mongoose');
const FieldSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  geometry: { type: { type: String, enum: ['Polygon','MultiPolygon'] }, coordinates: [] }, // GeoJSON
  soilProfile: {
    pH: Number, N: Number, P: Number, K: Number, organicMatter: Number
  },
  createdAt: { type: Date, default: Date.now }
});
FieldSchema.index({ geometry: '2dsphere' });
module.exports = mongoose.model('Field', FieldSchema);
