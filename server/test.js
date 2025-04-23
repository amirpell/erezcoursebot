const QRCode = require('qrcode-terminal');

const text = '2@SZcRGkvMTk4NG4aqH/CU96mI9cILYtzWZq+0e/7z8f5Uxt/V+7F6cmdrISrS2+YLXZuyyEH7Fc9a1jeijSDvNPLN+z4Or2hkmQQ=,N3sEkXsDAzLZkU7tGoao6jOxiBz4UBR29UeFwoRlbTI=,r9eH7kkzshJ00kqaGBfGTKGGlx7CcIxKKhz63cKxnDc=,34uTd6FRqiir07QxfixLuNVEJvImmpTUtxlQwO37jtE=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
