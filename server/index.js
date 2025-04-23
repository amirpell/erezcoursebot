const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express();
const port = process.env.PORT || 10000;

let isClientReady = false;

// יצירת לקוח WhatsApp
const client = new Client({
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process',
            '--disable-gpu',
            '--no-zygote'
        ]
    },
    authStrategy: new LocalAuth({
        clientId: "whatsapp-client",
        dataPath: "./sessions" // שים לב: ב-Render זה עלול להימחק בכל deploy!
    })
});

// אירועים של הלקוח
client.on('qr', qr => {
    console.log('📱 QR RECEIVED', qr);
});

client.on('ready', () => {
    isClientReady = true;
    console.log('✅ Client is ready!');
});

client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
});

client.on('disconnected', (reason) => {
    isClientReady = false;
    console.warn('⚠️ Client was disconnected. Reinitializing...', reason);
    client.initialize();
});

// אתחול הלקוח
client.initialize();

// שרת Express
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});

// שליחת הודעה
app.get('/sendmessages/:number', async (req, res) => {
    if (!isClientReady || !client.info || !client.info.wid) {
        return res.status(503).json({ message: 'Client not ready' });
    }

    const number = req.params.number;
    const fullnumber = "+972" + number.slice(1);
    const chatId = fullnumber.substring(1) + "@c.us";
    const text = `שלום! תודה שהתעניינת בקורסי `;

    try {
        await client.sendMessage(chatId, text);
        console.log('✅ Message sent to:', chatId);
        return res.status(200).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error('❌ Error sending message:', err.message);
        return res.status(500).json({ message: 'Failed to send message', error: err.message });
    }
});
