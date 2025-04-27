const QRCode = require('qrcode-terminal');

const text = '2@HVCsuXuDnjWsA9KeJWkRHzk3oTaTpaJPWMH3YsEHpHPJJDA8/hnAZCb+gka1ch/R2jo0WeH82E4zsbKkkzFdITEHJLol7xxNCdI=,n6++ofuRV6Q89fmj4kC8keRsQPu+nLYZ5VD/hpVocD8=,6oxSbJclwOqR4tUmay5wtuMnujkHLO9m+4bTO5s5Pis=,qpIj7qw0RFu3MAwqTIg0+LSe4OFbTw3WiGFWWLG4zrw=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
