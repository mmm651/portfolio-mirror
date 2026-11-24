const express = require('express');
const router = express.Router();
const Home = require('../models/home');

router.get('/', async (req, res) => {
  try {
    let data = await Home.findOne();
    if (!data) {
      data = await Home.create({});
    }
    res.json(data);
  } catch (err) {
    console.error('[home]', err);
    res.status(500).json({ error: 'Failed to fetch home data' });
  }
});

router.patch('/', async (req, res) => {
  try {
    const updated = await Home.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ message: 'Home page updated successfully!', data: updated });
  } catch (err) {
    console.error('[home]', err);
    res.status(500).json({ error: 'Failed to update home data' });
  }
});

module.exports = router;