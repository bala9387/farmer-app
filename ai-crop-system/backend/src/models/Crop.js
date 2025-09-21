const mongoose = require('mongoose');
const CropSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  season: String,
  soilReq: {
    pHMin: Number, pHMax: Number,
    NMin: Number, NMax: Number,
    PMin: Number, PMax: Number,
    KMin: Number, KMax: Number
  },
  waterReq: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Crop', CropSchema);
