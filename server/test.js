const QRCode = require('qrcode-terminal');

const text = '2@IPFIHyMmJ25c8/xiQwNSFYMECn59WoeaIp0jdn3mK0jYK8uzTeG+tvDhV2QlhXl59tK3SRgvIFKEySoNViHMdoHDhjmOQa7lPyg=,HnYcPC55mt6YytocYDSCqDHzh43biTXZHTd1IuDHtDk=,/7CJWfgjLLcmHZ/17jUTNm7rlG7y4pAAW74Tm1VHHRw=,DfQv/RTUkK3eI5fk994ZPmni6u8j3hZvCw9H2GRwdTg=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
