const express = require('express');
const router = express.Router();
const Orb = require('../models/orbs');

router.get('/', async (req, res) => {
  try {
    let data = await Orb.findOne();
    if (!data) {
      data = await Orb.create({ ambientOrbsImages: [] });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orbs images' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'Image URL is required' });

    let data = await Orb.findOne();
    if (!data) {
      data = await Orb.create({ ambientOrbsImages: [imageUrl] });
    } else {
      data.ambientOrbsImages.push(imageUrl);
      await data.save();
    }

    res.status(201).json({ message: 'Orb image added successfully!', ambientOrbsImages: data.ambientOrbsImages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add orb image' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    let data = await Orb.findOne();
    if (!data) return res.status(404).json({ error: 'Orbs data not found' });

    data.ambientOrbsImages = data.ambientOrbsImages.filter(img => img !== imageUrl);
    await data.save();

    res.json({ message: 'Orb image deleted successfully!', ambientOrbsImages: data.ambientOrbsImages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete orb image' });
  }
});

module.exports = router;