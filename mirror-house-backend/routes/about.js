const express = require('express');
const router = express.Router();
const About = require('../models/about');

router.get('/', async (req, res) => {
  try {
    let data = await About.findOne();
    if (!data) {
      data = await About.create({
        stats: [
          { id: 1, value: "12+", label: "Years of Craft" },
          { id: 2, value: "48", label: "Global Projects" },
          { id: 3, value: "99%", label: "Client Satisfaction" }
        ]
      });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch about data' });
  }
});

router.patch('/', async (req, res) => {
  try {
    const updated = await About.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
    res.json({ message: 'About section updated successfully!', data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update about section' });
  }
});

router.patch('/stats/:id', async (req, res) => {
  try {
    const statId = parseInt(req.params.id);
    const data = await About.findOne();
    if (!data) return res.status(404).json({ error: 'About data not found' });

    const statIndex = data.stats.findIndex(s => s.id === statId);
    if (statIndex === -1) return res.status(404).json({ error: 'Stat item not found' });

    data.stats[statIndex] = { ...data.stats[statIndex].toObject(), ...req.body };
    await data.save();

    res.json({ message: `Stat ${statId} updated successfully!`, stat: data.stats[statIndex] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update stat item' });
  }
});

module.exports = router;