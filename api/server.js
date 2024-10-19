const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'

app.use(cors());
app.use(express.json());

// Endpoint to receive location data
app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;
    // Log the received location data
    console.log(`Location received https://www.google.com/maps?q=${latitude},${longitude}`);
    
    // Respond with a confirmation message
    res.status(200).json({ message: `Location received https://www.google.com/maps?q=${latitude},${longitude}` });
});

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
