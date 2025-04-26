const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();
app.use(express.json());

app.post('/send-message/:number', async (req, res) => {
    const  number  = req.params.number;

    const message = "hello"
    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });

    client.on('qr', (qr) => {
        console.log('Scan this QR code to log in:', qr);
    });

    client.on('ready', async () => {
        console.log('Client is ready!');
        const fullnumber = "+972" + number.slice(1);
        const chatId = fullnumber.substring(1) + "@c.us";

        try {
            await client.sendMessage(chatId, message);
            console.log('Message sent!');
            await client.logout(); // OR client.destroy() if you want to keep session
            return res.status(200).json({ success: true, message: 'Message sent' });
        } catch (err) {
            console.error('Send message error:', err);
            return res.status(500).json({ error: 'Failed to send message' });
        } finally {
            client.destroy();
        }
    });

    client.on('auth_failure', (msg) => {
        console.error('Auth failure:', msg);
        return res.status(401).json({ error: 'Authentication failed' });
    });

    client.initialize();
});

const PORT = process.env.PORT||10000 ;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

