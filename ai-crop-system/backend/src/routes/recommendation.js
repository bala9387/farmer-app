const express = require('express');
const axios = require('axios');
const router = express.Router();
const Field = require('../models/Field');
const Crop = require('../models/Crop');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

router.get('/field/:fieldId', async (req,res) => {
  try {
    const fieldId = req.params.fieldId;
    const field = await Field.findById(fieldId).lean();
    if (!field) return res.status(404).json({ error: 'Field not found' });

    // aggregate latest soil & sensor summary (PoC: use soilProfile)
    const inputs = {
      pH: field.soilProfile?.pH,
      N: field.soilProfile?.N,
      P: field.soilProfile?.P,
      K: field.soilProfile?.K,
      geometry: field.geometry
    };

    // call ML microservice
    const resp = await axios.post(`${ML_SERVICE_URL}/predict`, { inputs });
    const recommendations = resp.data.recommendations;

    // persist recommendation optionally (left as exercise)
    res.json({ fieldId, inputs, recommendations });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ error: 'server' });
  }
});

module.exports = router;
