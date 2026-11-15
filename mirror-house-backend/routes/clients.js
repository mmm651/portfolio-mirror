const express = require('express');
const router = express.Router();
const Client = require('../models/client');

router.get('/', async (req, res) => {
  try {
    let data = await Client.findOne();
    if (!data) {
      data = await Client.create({
        clientsList: [
          { id: 1, name: "Solstice", category: "FINTECH" },
          { id: 2, name: "Aurelia", category: "BOTANICALS" },
          { id: 3, name: "Kanso", category: "ARCHITECTURE" },
          { id: 4, name: "Vespera", category: "HOSPITALITY" }
        ],
        testimonial: {
          quote: "mirror-house transformed our platform into an effortless, luminous experience our customers love.",
          author: "Nadia Al-Mansoor, CPO at Solstice"
        }
      });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clients data' });
  }
});

router.patch('/', async (req, res) => {
  try {
    const updated = await Client.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
    res.json({ message: 'Clients section updated successfully!', data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update clients data' });
  }
});

router.patch('/card/:id', async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const data = await Client.findOne();
    if (!data) return res.status(404).json({ error: 'Clients data not found' });

    const clientIndex = data.clientsList.findIndex(c => c.id === clientId);
    if (clientIndex === -1) return res.status(404).json({ error: 'Client card not found' });

    data.clientsList[clientIndex] = { ...data.clientsList[clientIndex].toObject(), ...req.body };
    await data.save();

    res.json({ message: `Client card ${clientId} updated successfully!`, client: data.clientsList[clientIndex] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update client card' });
  }
});

module.exports = router;