require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Root URL handler
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.get('/zipcode', async (req, res) => {
    const zip = req.query.zip;
    if (!zip) {
        return res.status(400).send('Zip code is required');
    }
    const url = `https://www.zipcodeapi.com/rest/${process.env.ZIPCODEAPI_KEY}/info.json/${zip}/degrees`;
    try {
        const apiRes = await get(url); // Changed from fetch to axios since axios was imported not fetch
        res.json(apiRes.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
