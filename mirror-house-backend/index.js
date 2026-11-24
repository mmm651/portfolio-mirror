require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import Routes
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const contactRoutes = require('./routes/contact');
const clientRoutes = require('./routes/client');
const servicesRoutes = require('./routes/services');
const orbsRoutes = require('./routes/orbs');
const brandRoutes = require('./routes/theme');

// Register Routes
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/orbs', orbsRoutes);
app.use('/api/brand', brandRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Mirror House Backend (MongoDB) is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});