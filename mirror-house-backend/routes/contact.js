const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/contact.json');

async function getMessages() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

router.get('/', async (req, res) => {
  const messages = await getMessages();
  res.json(messages);
});

router.post('/', async (req, res) => {
  try {
    const { name, email, projectVision } = req.body;

    if (!name || !email || !projectVision) {
      return res.status(400).json({ error: 'All fields are required (name, email, projectVision).' });
    }

    const messages = await getMessages();

    const newMessage = {
      id: Date.now(),
      name,
      email,
      projectVision,
      date: new Date().toISOString()
    };

    messages.push(newMessage);

    await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2), 'utf8');

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been sent successfully!',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send inquiry.' });
  }
});

module.exports = router;