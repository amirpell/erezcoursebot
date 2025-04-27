const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');

const app = express();
app.use(express.json());

app.use(express.static('public'));

let client;

function createClient() {
    client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
            headless: "new",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--disable-gpu',
                '--no-zygote'
            ],
            executablePath: process.env.CHROME_BIN || null // לרנדר זה חשוב
        }
    });

    client.on('qr', (qr) => {
        console.log('Scan this QR code to log in:', qr);
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('disconnected', (reason) => {
        console.log('Client disconnected:', reason);
        client.destroy();
        client = null;
        createClient(); // תנסה להתחבר שוב אוטומטית
    });

    client.initialize().catch(err => {
        console.error('Failed to initialize client:', err);
    });
}

createClient(); // יצירה אחת בלבד כשהשרת עולה

// שליחת הודעה
app.post('/send-message/:number', async (req, res) => {
    const { number } = req.params;
    const message = "Hello from your bot! 🤖";

    if (!number) {
        return res.status(400).json({ error: 'Number is required' });
    }

    if (!client || !client.info) {
        return res.status(500).json({ error: 'Client is not ready yet' });
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

// התחלת השרת
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
