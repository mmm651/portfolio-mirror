const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  sectionTag: { type: String, default: "OUR SERVICES" },
  title: { type: String, default: "Crafted with precision & warmth." },
  servicesList: [
    {
      id: Number,
      category: String,
      title: String,
      description: String,
      features: [String]
    }
  ]
});

module.exports = mongoose.model('Service', serviceSchema);