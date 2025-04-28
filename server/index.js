const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));

let client;

function createClient() {
    client = new Client({
        authStrategy: new LocalAuth({ clientId: "YOUR_CLIENT_ID",
            dataPath: "sessions"
         }),        puppeteer: {
            headless: "new",

            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--disable-gpu',
                '--no-zygote'
            ],
        }
    });

    client.on('qr', (qr) => {
        console.log('Scan this QR code to log in:', qr);
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('disconnected', (reason) => {
        console.log('Client disconnected:', reason);
        client.destroy();
        client = null;
        createClient(); // תנסה להתחבר שוב אוטומטית
    });

    client.initialize().catch(err => {
        console.error('Failed to initialize client:', err);
    });
}

createClient(); // יצירה אחת בלבד כשהשרת עולה

// שליחת הודעה
app.post('/send-message', async (req, res) => {
   // const { number } = req.params;
   const phoneNumber = req.body.fields.field_adcf804.value;
  
    console.log('body fields:', req.body);

    const message = `שלום! תודה שהתעניינת בקורס ״בניית תכניות אימון לעלייה במסת שריר – מיועד למאמני כושר אישיים ואונליין״ 💪
כדי שתוכל/י לקבל את כל הפרטים בנוחות – ריכזנו עבורך הכל במקום אחד:
🔹 מבנה ותכני הקורס
🔹 עלות הקורס
🔹 מי אנחנו ומה הניסיון שלנו
🔹 שאלות ותשובות נפוצות
🔹 המלצות של משתתפים קודמים

⬇ להיכנס לכל המידע בלינק המצורף:
https://progress-workout.com/מיועד-למאמני-כושר-אישיים-ומאמני-אונלי/

אם נשארת שאלה או משהו לא ברור – אנחנו כאן בוואטסאפ 🙋‍♂`;;

    if (!phoneNumber) {
        return res.status(400).json({ error: 'Number is required' });
    }

    const fullnumber = "+972" + phoneNumber.slice(1);
    const chatId = fullnumber.substring(1) + "@c.us";

    console.log(`Attempting to send message to: ${fullnumber}`); // לוג
    try {
         client.sendMessage(chatId, message);
        console.log(`Message sent to ${fullnumber}`); // לוג אחרי שליחה
        return res.status(200).json({ success: true, message: `Message sent to ${fullnumber}` });
    } catch (err) {
        console.error('Send message error:', err);
        return res.status(500).json({ error: 'Failed to send message' });
    }
});


// התחלת השרת
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

