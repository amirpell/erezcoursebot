const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');

const app = express();
app.use(express.json());

// Serve the HTML file
app.use(express.static('public'));

// Create WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-dev-shm-usage'],
         dataPath: "./sessions"
    }
});

// WhatsApp events
client.on('qr', (qr) => {
    console.log('Scan this QR code to log in:', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

// Home page

// Send message via POST and number in URL
app.post('/send-message/:number', async (req, res) => {
    const { number } = req.params;
    const message = "Hello from your bot! 🤖"; // you can change this

    if (!number) {
        return res.status(400).json({ error: 'Number is required' });
    }

    const fullnumber = "+972" + number.slice(1);
    const chatId = fullnumber.substring(1) + "@c.us";

    try {
        await client.sendMessage(chatId, message);
        console.log(`Message sent to ${fullnumber}`);
        return res.status(200).json({ success: true, message: `Message sent to ${fullnumber}` });
    } catch (err) {
        console.error('Send message error:', err);
        return res.status(500).json({ error: 'Failed to send message' });
    }
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

