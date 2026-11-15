const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, projectVision } = req.body;
    if (!name || !email || !projectVision) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newMessage = await Contact.create({ name, email, projectVision });
    res.status(201).json({
      success: true,
      message: 'Your inquiry has been sent successfully!',
      data: newMessage
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send inquiry' });
  }
});

module.exports = router;