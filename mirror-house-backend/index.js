const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes (Content & Images Only)
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const contactRoutes = require('./routes/contact');
const clientRoutes = require('./routes/client');
const servicesRoutes = require('./routes/services');
const orbsRoutes = require('./routes/orbs');
const brandRoutes = require('./routes/theme'); // لتعديل أسماء العناوين والبراند

// Register Routes
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/orbs', orbsRoutes);     // معرض الصور العائمة الصغيرة
app.use('/api/brand', brandRoutes);   // عناوين النافبار والكرات واللوجو

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Mirror House Backend (Content & Images API) is running successfully!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});