const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/theme.json');

async function getThemeData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    
    
    
    return {
      brandTitle: "mirror-house",
      italicSerifStyle: true,
      centerpieceTitleScale: 1,
      navBubbleTitles: {
        home: "Home",
        about: "About Us",
        contact: "Contact Us",
        services: "Our Services",
        clients: "Our Clients"
      }
    };
  }
}


router.get('/', async (req, res) => {
  const data = await getThemeData();
  res.json(data);
});


router.patch('/', async (req, res) => {
  try {
    const currentData = await getThemeData();
    const updatedData = { ...currentData, ...req.body };

    await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), 'utf8');
    res.json({ message: 'Brand & titles updated successfully!', data: updatedData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update brand settings' });
  }
});

module.exports = router;