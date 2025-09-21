require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// connect DB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai_crop';
mongoose.connect(MONGO_URI).then(()=> console.log('Mongo connected')).catch(console.error);

// routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/fields', require('./src/routes/fields'));
app.use('/api/crops', require('./src/routes/crops'));
app.use('/api/sensors', require('./src/routes/sensors'));
app.use('/api/recommendations', require('./src/routes/recommendation'));

app.get('/', (req,res)=> res.send('AI Crop Recommendation Backend'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
