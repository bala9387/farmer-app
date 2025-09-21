const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// register
router.post('/register', async (req,res)=>{
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash, role });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server' }); }
});

// login
router.post('/login', async (req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server' }); }
});

module.exports = router;
