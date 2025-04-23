const QRCode = require('qrcode-terminal');

const text = '';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
