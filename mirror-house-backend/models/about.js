const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  sectionTag: { type: String, default: "ABOUT US" },
  title: { type: String, default: "Reflecting values, shaping spaces." },
  description: { type: String, default: "We are a multidisciplinary studio creating tactile, human-centric digital experiences that resonate with warmth and precision." },
  stats: [
    {
      id: Number,
      value: String,
      label: String
    }
  ]
});

module.exports = mongoose.model('About', aboutSchema);