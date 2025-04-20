const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const { Client , LocalAuth } = require('whatsapp-web.js');


app.listen(port,()=>{
    console.log(`server on ${port}`);
});




app.get(`/sendmessage/:number`, async (req,res) =>{
    const client = new Client(
        {
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                ],
            },
            authStrategy: new LocalAuth({
                clientId: "YOUR_CLIENT_ID"
            }),
        }
    );
    let isClientReady = false;
    
    client.on('disconnected', (reason) => {
        console.log('🚫 הלקוח התנתק! סיבה:', reason);
        isClientReady = false;
    
    });
    
    client.on('auth_failure', (message) => {
        console.log('🔴 בעיית התחברות:', message);
    });
    client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        console.log('QR RECEIVED', qr);
    });
    
    client.on('change_state', state => {
        console.log('Client state changed:', state);
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
        isClientReady = true;
    
         // Number where you want to send the message.
       
         // Your message.
       
         // Getting chatId from the number.
         // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
       
        // Sending message.
       });
    
    
    
    client.initialize();
    if (!isClientReady) {
        return res.status(500).json({ message: "WhatsApp client not ready yet." });
    }
        try{

            const number = req.params.number;
    const fullnumber = "+972"+number.slice(1)
    console.log("+972"+number)
    const text = `שלום! תודה שהתעניינת בקורס ״בניית תכניות אימון לעלייה במסת שריר – מיועד למאמני כושר אישיים ואונליין״ 💪 כדי שתוכל/י לקבל את כל הפרטים בנוחות – ריכזנו עבורך הכל במקום אחד:
 🔹 מבנה ותכני הקורס
 🔹 עלות הקורס
 🔹 מי אנחנו ומה הניסיון שלנו
 🔹 שאלות ותשובות נפוצות
 🔹 המלצות של משתתפים קודמים

⬇ להיכנס לכל המידע בלינק המצורף:
    https://progress-workout.com/מיועד-למאמני-כושר-אישיים-ומאמני-אונלי/
    
אם נשארת שאלה או משהו לא ברור – אנחנו כאן בוואטסאפ 🙋‍♂`
    
    const chatId = fullnumber.substring(1) + "@c.us";
         
    await client.sendMessage(chatId, text);
            console.log(chatId)
            res.status(200).json({message: "seccess"})
    
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "error"})
        }
    })
    