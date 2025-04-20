const express = require('express');
const app = express();
const port = 3001;
const { Client , LocalAuth } = require('whatsapp-web.js');


app.listen(port,()=>{
    console.log(`server on ${port}`);
});


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

let clientReady = false;
client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});


client.on('ready', () => {
    console.log('Client is ready!');
   
    clientReady = true;

   });
   client.on('disconnected', (reason) => {
    console.error('⚠ Client was disconnected:', reason);
    clientReady = false;
    // אתחול מחדש אם נותק
    setTimeout(() => {
        console.log('🔁 Reinitializing client...');
        client.initialize();
    }, 5000);
});
client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
});


client.initialize();

app.get(`/sendmessage/:number`, async (req, res) => {
    if (!clientReady) {
        return res.status(503).json({ message: "Client not ready yet. Please try again shortly." });
    }

    try {
        const number = req.params.number;
        const fullNumber = "+972" + number.slice(1);
        console.log("Sending to:", fullNumber);
        
        const text = `שלום! תודה שהתעניינת בקורס ״בניית תכניות אימון לעלייה במסת שריר – מיועד למאמני כושר אישיים ואונליין״ 💪
        כדי שתוכל/י לקבל את כל הפרטים בנוחות – ריכזנו עבורך הכל במקום אחד:
        🔹 מבנה ותכני הקורס
        🔹 עלות הקורס
        🔹 מי אנחנו ומה הניסיון שלנו
        🔹 שאלות ותשובות נפוצות
        🔹 המלצות של משתתפים קודמים

        ⬇ להיכנס לכל המידע בלינק המצורף:
        https://progress-workout.com/מיועד-למאמני-כושר-אישיים-ומאמני-אונלי/

        אם נשארת שאלה או משהו לא ברור – אנחנו כאן בוואטסאפ 🙋‍♂`;

        const chatId = fullNumber.substring(1) + "@c.us";

        await client.sendMessage(chatId, text);
        console.log(`✅ Message sent to ${chatId}`);
        res.status(200).json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: "Failed to send message", error: error.message });
    }
});
    