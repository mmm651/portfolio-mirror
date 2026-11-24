const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  brandTitle: { type: String, default: "mirror-house" },
  italicSerifStyle: { type: Boolean, default: true },
  centerpieceTitleScale: { type: Number, default: 1 },
  navBubbleTitles: {
    home: { type: String, default: "Home" },
    about: { type: String, default: "About Us" },
    contact: { type: String, default: "Contact Us" },
    services: { type: String, default: "Our Services" },
    clients: { type: String, default: "Our Clients" }
  }
});

module.exports = mongoose.model('Theme', themeSchema);