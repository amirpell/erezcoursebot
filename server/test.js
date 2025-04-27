const QRCode = require('qrcode-terminal');

const text = '2@pl8zS69d6WhyzqdruDXSjSydDnu3iperV/eqCPZRCrGZZvQKAOefsB0JLbPBoIXfFKgfUQ/LVmoq/MJwmishkBk+j81KxGYfzF0=,1I0LD4Ov+f7sI4OWTdmdZmo0GvZqjl2WQj8aowxeqSI=,fWLj/mqNs0J5BjC/8EpyrjtGe/yGKQsNjbma2Eh+oyk=,w9GQqx1uhQC839f9Z4Q02TvKj6XSisF7ID96kETl2NQ=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
