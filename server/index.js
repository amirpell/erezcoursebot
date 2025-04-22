const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const { Client, LocalAuth } = require('whatsapp-web.js');

app.listen(port, () => {
    console.log(`server on ${port}`);
});

const client = new Client({
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
        ],
    },
    authStrategy: new LocalAuth({ clientId: "YOUR_CLIENT_ID" }),
});

let isClientReady = false;

client.on('ready', () => {
    console.log('Client is ready!');
    isClientReady = true;
});
client.on('disconnected', reason => {
    console.log('🚫 הלקוח התנתק! סיבה:', reason);
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
const messageQueue = [];
let isSending = false;

const processQueue = async () => {
    if (isSending || !isClientReady || messageQueue.length === 0) return;

    isSending = true;
    const { chatId, text, res } = messageQueue.shift();

    try {
        await client.sendMessage(chatId, text);
        console.log('Message sent to:', chatId);
        res.status(200).json({ message: 'Success' });
    } catch (err) {
        console.log('❌ Error sending message:', err);
        res.status(500).json({ message: 'Failed to send' });
    } finally {
        isSending = false;
        setTimeout(processQueue, 1500); // זמן בין הודעות
    }
};

// --- Endpoint ---
app.get('/sendmessage/:number', (req, res) => {
    if (!isClientReady) {
        return res.status(500).json({ message: "WhatsApp client not ready yet." });
    }

    const number = req.params.number;
    const fullnumber = "+972" + number.slice(1);
    const chatId = fullnumber.substring(1) + "@c.us";
    const text = `שלום! תודה שהתעניינת בקורס ״בניית תכניות אימון לעלייה במסת שריר – מיועד למאמני כושר אישיים ואונליין״  ...`;

    messageQueue.push({ chatId, text, res });
    res.status(202).json({ message: "Message added to queue" });

    processQueue();
});
