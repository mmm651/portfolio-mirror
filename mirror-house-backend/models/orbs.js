const mongoose = require('mongoose');

const orbSchema = new mongoose.Schema({
  ambientOrbsImages: [String]
});

module.exports = mongoose.model('Orb', orbSchema);