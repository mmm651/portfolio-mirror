const express = require('express');
const app = express();
const cors = require('cors'); // Fixed: 'cros' -> 'cors'
require('dotenv').config();
const PORT = process.env.PORT || 3000; // Fixed: process.env.port -> process.env.PORT

app.use(cors()); // Fixed: cros() -> cors()
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});