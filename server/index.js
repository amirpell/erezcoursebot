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
    
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});


client.on('ready', () => {
   
        console.log('Client is ready!');
   });


client.initialize();

    