const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express();
const port = process.env.PORT || 3001;

// אתחול הלקוח
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "erez-course-client"
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-extensions',
            '--disable-gpu',
            '--no-default-browser-check',
            '--no-first-run',
            '--disable-dev-shm-usage',
        ],
    }
});

// משתנה שמסמן אם הלקוח מוכן
let clientReady = false;

// אירוע קבלת QR
client.on('qr', (qr) => {
    console.log('📱 סרוק את הקוד הזה כדי להתחבר לוואטסאפ:\n', qr);
});

// אירוע מוכנות
client.on('ready', () => {
    console.log('✅ Client is ready!');
    clientReady = true;
});

// אירוע ניתוק
client.on('disconnected', (reason) => {
    console.log('⚠ Client was disconnected:', reason);
    clientReady = false;
    // אתחול מחדש
    setTimeout(() => {
        console.log('🔁 Reinitializing client...');
        client.initialize();
    }, 5000);
});

client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
});

client.on('change_state', state => {
    console.log('📶 Client state changed:', state);
});

// אתחול הלקוח
client.initialize();

// פונקציה לשליחת הודעה עם ניסיון חוזר
async function safeSendMessage(chatId, message, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await client.sendMessage(chatId, message);
        } catch (error) {
            console.error(`❌ Error sending message (try ${i + 1}):`, error.message);
            await new Promise(res => setTimeout(res, 2000));
        }
    }
    throw new Error('Failed to send message after retries');
}

// נקודת API לשליחת הודעה
app.get('/sendmessage/:number', async (req, res) => {
    if (!clientReady) {
        return res.status(503).json({ message: "Client not ready yet. Please try again shortly." });
    }

    try {
        const number = req.params.number;
        const fullNumber = "+972" + number.slice(1);
        const chatId = fullNumber.substring(1) + "@c.us";

        const text = `שלום! תודה שהתעניינת בקורס ״בניית תכניות אימון לעלייה במסת שריר – מיועד למאמני כושר אישיים ואונליין״ 💪

כדי שתוכל/י לקבל את כל הפרטים בנוחות – ריכזנו עבורך הכל במקום אחד:
🔹 מבנה ותכני הקורס
🔹 עלות הקורס
🔹 מי אנחנו ומה הניסיון שלנו
🔹 שאלות ותשובות נפוצות
🔹 המלצות של משתתפים קודמים

⬇ להיכנס לכל המידע בלינק המצורף:
https://progress-workout.com/מיועד-למאמני-כושר-אישיים-ומאמני-אונלי/

אם נשארת שאלה או משהו לא ברור – אנחנו כאן בוואטסאפ 🙋‍♂`;

        await safeSendMessage(chatId, text);

        console.log(`✅ הודעה נשלחה ל-${chatId}`);
        res.status(200).json({ message: "Message sent successfully" });

    } catch (error) {
        console.error('❌ Failed to send message:', error.message);
        res.status(500).json({ message: "Failed to send message", error: error.message });
    }
});

// הפעלת השרת
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
