const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
  try {
    let data = await Service.findOne();
    if (!data) {
      data = await Service.create({
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
      });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services data' });
  }
});

router.patch('/', async (req, res) => {
  try {
    const updated = await Service.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
    res.json({ message: 'Services section updated successfully!', data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update services section' });
  }
});

router.patch('/item/:id', async (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const data = await Service.findOne();
    if (!data) return res.status(404).json({ error: 'Services data not found' });

    const serviceIndex = data.servicesList.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) return res.status(404).json({ error: 'Service item not found' });

    data.servicesList[serviceIndex] = { ...data.servicesList[serviceIndex].toObject(), ...req.body };
    await data.save();

    res.json({ message: `Service ${serviceId} updated successfully!`, service: data.servicesList[serviceIndex] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service item' });
  }
});

module.exports = router;