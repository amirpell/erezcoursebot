const express = require('express');
const app = express();
const port = 3001;

const puppeteer = require('puppeteer');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "CLIENT-1" }),
    puppeteer: {
        headless: true,
        executablePath: puppeteer.executablePath(), // זה כל מה שצריך!
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
});

let clientReady = false;

client.on('qr', (qr) => {
    console.log('📸 QR RECEIVED');
    console.log(qr);
});

client.on('ready', () => {
    console.log('✅ Client is ready!');
    clientReady = true;
});

client.initialize();

app.get('/sendmessage/:number', async (req, res) => {
    if (!clientReady) {
        return res.status(503).json({ message: "Client not ready yet. Please try again shortly." });
    }

    try {
        const number = req.params.number;
        const fullNumber = "+972" + number.slice(1);
        const chatId = fullNumber.substring(1) + "@c.us";

        const text = `שלום! תודה שהתעניינת בקורס ״בניית תכניות אימון לעלייה במסת שריר – מיועד למאמני כושר אישיים ואונליין״ 💪

⬇ להיכנס לכל המידע בלינק המצורף:
https://progress-workout.com/מיועד-למאמני-כושר-אישיים-ומאמני-אונלי/

אם נשארת שאלה או משהו לא ברור – אנחנו כאן בוואטסאפ 🙋‍♂`;

        await client.sendMessage(chatId, text);
        console.log(`✅ Message sent to ${chatId}`);
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error('❌ Error sending message:', error);
        res.status(500).json({ message: "Failed to send message", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
