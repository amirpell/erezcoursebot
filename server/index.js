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

    