const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint to receive location data
app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;

    // Log the received location data
    console.log(`Received Location: ${latitude}, ${longitude}`);
    
    // Respond with a confirmation message
    res.status(200).json({ message: 'Location received', latitude, longitude });
});

// Start the server
app.listen(PORT, () => {
    console.log(`https://5a22-136-158-28-227.ngrok-free.app`);
});
