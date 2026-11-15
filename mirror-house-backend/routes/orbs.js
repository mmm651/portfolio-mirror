const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/orbs.json');

async function getOrbsData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { ambientOrbsImages: [] };
  }
}

router.get('/', async (req, res) => {
  const data = await getOrbsData();
  res.json(data);
});

router.post('/', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const data = await getOrbsData();
    data.ambientOrbsImages.push(imageUrl);

    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    res.status(201).json({ message: 'Orb image added successfully!', ambientOrbsImages: data.ambientOrbsImages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add orb image' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const data = await getOrbsData();
    
    data.ambientOrbsImages = data.ambientOrbsImages.filter(img => img !== imageUrl);

    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    res.json({ message: 'Orb image deleted successfully!', ambientOrbsImages: data.ambientOrbsImages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete orb image' });
  }
});

module.exports = router;