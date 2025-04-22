const express = require('express');
const app = express();
const port = process.env.PORT || 10000;
const { Client, LocalAuth } = require('whatsapp-web.js');

app.listen(port, () => {
    console.log(`server on ${port}`);
});

const client = new Client({
    puppeteer: {
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process',
            '--disable-gpu',
            '--no-zygote'
        ],

    },
    authStrategy: new LocalAuth({ clientId: "YOUR_CLIENT_ID",
        dataPath: "sessions"
     }),
});

let isClientReady = false;

client.on('ready', () => {
    console.log('Client is ready!');
    isClientReady = true;
});
client.on('disconnected', reason => {
    console.log('🚫 Client disconnected. Reason:', reason);
    isClientReady = false;

  
});
client.on('auth_failure', message => {
    console.log('🔴 בעיית התחברות:', message);
});
client.on('qr', qr => {
    console.log('QR RECEIVED', qr);
});

client.initialize();

// --- Queue handling ---


// --- Endpoint ---
app.get('/sendmessage/:number',async (req, res) => {
    console.log('isClientReady:', isClientReady);

    if (!isClientReady) {
        return res.status(500).json({ message: "WhatsApp client not ready yet." });
    }

    const number = req.params.number;
    const fullnumber = "+972" + number.slice(1);
    const chatId = fullnumber.substring(1) + "@c.us";
    const text = `שלום! תודה שהתעניינת בקורסי `;

    try {
        await client.sendMessage(chatId, text);
        console.log('✅ Message sent to:', chatId);
        return res.status(200).json({ message: 'Message sent successfully' }); // ✅ שולח תגובה חזרה

    } catch (err) {
        console.error('❌ Error sending message:', err.message);
        return res.status(500).json({ message: 'Failed to send message', error: err.message }); // ✅ שולח שגיאה

    }
});
app.get('/ping', (req, res) => {
    res.send('pong');
  });
  setInterval(() => {
    if (isClientReady) {
        console.log('✅ Bot is alive');
    }
}, 60000); // כל דקה