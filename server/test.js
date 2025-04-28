const QRCode = require('qrcode-terminal');

const text = '2@6U+r4RxpZwaWfPt00/kC+DnPOLX6ZN6NNvfojpUoSOqePoDcVastaAYKiqG52mZWmrU/W30XSxlLzrkxajU/gax/NhfBqV2gsEQ=,xBSvRpmyERnL6uhE10BTa8yc2oMVV4jDn6JOXCf7QV4=,wjD56Lt+LBxNC5CWoJDTl/4cYl9lL3OR49Sek0hFrD0=,TvTJTW/xfLui6M85mi7Wl20ZItUXvqKqk60SWVkI+Ts=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
