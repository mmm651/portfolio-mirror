const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/services.json');

async function getServicesData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {
      sectionTag: "OUR SERVICES",
      title: "Crafted with precision & warmth.",
      servicesList: [
        {
          id: 1,
          category: "DIGITAL INTERFACES",
          title: "UI/UX Product Design",
          description: "Human-centered interfaces crafted with tactile clarity, fluid micro-interactions, and warm editorial precision.",
          features: ["User Research & Flows", "Interactive Prototypes", "Usability Testing"]
        },
        {
          id: 2,
          category: "VISUAL IDENTITY",
          title: "Brand Reflection & Identity",
          description: "Cohesive visual systems that mirror your brand's core essence across every digital touchpoint.",
          features: ["Logo & Typography", "Art Direction", "Brand Guidelines"]
        },
        {
          id: 3,
          category: "WEB ENGINEERING",
          title: "Interactive Web Architecture",
          description: "Performant, responsive web experiences built with modern frameworks and architectural balance.",
          features: ["Frontend Development", "Motion & Choreography", "Performance Optimization"]
        },
        {
          id: 4,
          category: "SCALABLE SYSTEMS",
          title: "Design Systems & Tokens",
          description: "Unified component libraries and design tokens ensuring consistency and speed for growing product teams.",
          features: ["Component Libraries", "Design Tokens", "Documentation"]
        }
      ]
    };
  }
}

router.get('/', async (req, res) => {
  const data = await getServicesData();
  res.json(data);
});

router.patch('/', async (req, res) => {
  try {
    const currentData = await getServicesData();
    const updatedData = { ...currentData, ...req.body };

    await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), 'utf8');
    res.json({ message: 'Services section updated successfully!', data: updatedData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update services section' });
  }
});

router.patch('/item/:id', async (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const currentData = await getServicesData();

    const serviceIndex = currentData.servicesList.findIndex(s => s.id === serviceId);

    if (serviceIndex === -1) {
      return res.status(404).json({ error: 'Service item not found' });
    }

    currentData.servicesList[serviceIndex] = {
      ...currentData.servicesList[serviceIndex],
      ...req.body
    };

    await fs.writeFile(dataFilePath, JSON.stringify(currentData, null, 2), 'utf8');

    res.json({
      message: `Service ${serviceId} updated successfully!`,
      service: currentData.servicesList[serviceIndex]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service item' });
  }
});

module.exports = router;