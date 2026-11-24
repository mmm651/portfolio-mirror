const express = require('express');
const router = express.Router();
const Theme = require('../models/theme');

router.get('/', async (req, res) => {
  try {
    let data = await Theme.findOne();
    if (!data) {
      data = await Theme.create({});
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch brand settings' });
  }
});

router.patch('/', async (req, res) => {
  try {
    const updated = await Theme.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
    res.json({ message: 'Brand & titles updated successfully!', data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update brand settings' });
  }
});

module.exports = router;