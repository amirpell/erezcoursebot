const express = require('express');
const app = express();
const port = 3001;
const { Client , LocalAuth } = require('whatsapp-web.js');


app.listen(port,()=>{
    console.log(`server on ${port}`);
});


const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "CLIENT-1"
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
   
    clientReady = true;
    setTimeout(() => {
        // השאר את הקוד שלך כאן
        clientReady = true;
        console.log('Client is ready!');

    }, 5000);  // זמן המתנה של 5 שניות
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
    