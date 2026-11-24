const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');



router.delete('/:id',async(req,res)=>{
  try{
    if(!mongoose.isValidObjectId(req.params.id))
      {return res.status(400).json({error:'Messeage not found'});}
  const deleted= await Contact.findByIdAndDelete(req.params.id);
  if(!deleted){return res.status(400).json({error:('messeage failed to delete')})}
    return res.status(200).json({messeage:'Messeage deleted succsesfully'})

  }

  catch (err) {
    console.error('[contact]', err);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});


router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error('[contact]', err);
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
    console.error('[contact]', err);
    res.status(500).json({ error: 'Failed to send inquiry' });
  }
});

module.exports = router;