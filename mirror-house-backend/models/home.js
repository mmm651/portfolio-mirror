const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  tag: { type: String, default: 'ATELIER OF DIGITAL REFLECTION' },
  title: { type: String, default: 'mirror-house' },
  subtitle: { type: String, default: 'Reflections of timeless design & human-centric digital craft. Select any orbiting sphere to explore.' }
});

module.exports = mongoose.model('Home', homeSchema);