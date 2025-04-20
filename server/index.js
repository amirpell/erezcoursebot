const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const { Client, LocalAuth } = require('whatsapp-web.js');

// בדיקה אם הריצה בסביבת Production (כמו Render)

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "main-session"
    }),
    puppeteer: {
        headless: false,
        args:[
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-extensions',
            '--disable-gpu',
            '--no-default-browser-check',
            '--no-first-run',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-zygote',
            '--single-process',
        ]
    }
});

client.on('qr', (qr) => {
    console.log('📱 QR RECEIVED:\n', qr);
});

client.on('ready', () => {
    console.log('✅ WhatsApp client is ready!');
});

client.on('auth_failure', msg => {
    console.error('❌ AUTHENTICATION FAILURE', msg);
});

client.on('disconnected', reason => {
    console.warn('⚠ Client was logged out', reason);
});

client.initialize();

app.get('/sendmessage/:number', async (req, res) => {
    try {
        const number = req.params.number;
        const fullNumber = "+972" + number.slice(1);
        const chatId = fullNumber.substring(1) + "@c.us";

        const text = `שלום! תודה שהתעניינת בקורס ״בניית תכניות אימון לעלייה במסת שריר – מיועד למאמני כושר אישיים ואונליין״ 💪 כדי שתוכל/י לקבל את כל הפרטים בנוחות – ריכזנו עבורך הכל במקום אחד:
🔹 מבנה ותכני הקורס
🔹 עלות הקורס
🔹 מי אנחנו ומה הניסיון שלנו
🔹 שאלות ותשובות נפוצות
🔹 המלצות של משתתפים קודמים

⬇ להיכנס לכל המידע בלינק המצורף:
https://progress-workout.com/מיועד-למאמני-כושר-אישיים-ומאמני-אונלי/

אם נשארת שאלה או משהו לא ברור – אנחנו כאן בוואטסאפ 🙋‍♂`;

        await client.sendMessage(chatId, text);
        console.log(`✅ Message sent to ${chatId}`);
        res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error('❌ Error sending message:', error.message);
        res.status(500).json({ message: "Error", error: error.message });
    }
});
