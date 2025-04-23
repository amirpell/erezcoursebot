const express = require('express');
const app = express();
const port = process.env.PORT || 10000;
const { Client, LocalAuth } = require('whatsapp-web.js');

app.listen(port, () => {
    console.log(`server on ${port}`);
});

const client = new Client({
    puppeteer: {
        headless: false,
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


const waitForClientReady = new Promise((resolve, reject) => {
    client.on('ready', () => {
        console.log('Client is ready!');
        resolve(); // Resolve when the client is ready
    });

    client.on('qr', qr => {
        console.log('QR RECEIVED', qr);
    });

    client.on('auth_failure', () => {
        reject('Authentication failed');
    });

    client.on('disconnected', () => {
        reject('Client disconnected');
    });
});

async function initializeClient() {
    await client.initialize();
    await waitForClientReady; // Wait here until the client is ready
    console.log('Now the client is ready and we can proceed with other operations');
}

initializeClient();


// --- Endpoint ---
app.get('/sendmessages/:number',async (req, res) => {

    

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
