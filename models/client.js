const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  sectionTag: { type: String, default: "OUR CLIENTS" },
  trustedLabel: { type: String, default: "Trusted Globally" },
  title: { type: String, default: "Partnerships built on shared vision." },
  clientsList: [
    {
      id: Number,
      name: String,
      category: String
    }
  ],
  testimonial: {
    quote: String,
    author: String
  }
});

module.exports = mongoose.model('Client', clientSchema);