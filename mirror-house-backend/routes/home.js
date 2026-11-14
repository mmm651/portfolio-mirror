const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// المسار الصحيح والمرن باستخدام __dirname
const dataFilePath = path.join(__dirname, '../data/home.json');

async function getHomeData() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('error in home, using default data...');
        // الداتا الافتراضية مطابقة للتصميم الفخم بتاعك
        return {
            tag: 'ATELIER OF DIGITAL REFLECTION',
            title: 'mirror-house',
            subtitle: 'Reflections of timeless design & human-centric digital craft. Select any orbiting sphere to explore.'
        };  
    }
}

// GET /api/home
router.get('/', async (req, res) => {
  const currentData = await getHomeData();
  res.json(currentData);
});

// PATCH /api/home
router.patch('/', async (req, res) => {
    try {
        const oldPart = await getHomeData();
        const updatedPart = { ...oldPart, ...req.body };

        await fs.writeFile(dataFilePath, JSON.stringify(updatedPart, null, 2), 'utf8');

        res.json({ message: 'Home page patched successfully!', data: updatedPart });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update home data' });
    }
});

module.exports = router;