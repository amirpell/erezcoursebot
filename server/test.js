const QRCode = require('qrcode-terminal');

const text = '2@1f+qnH5Io0Q1vS6CQoFMgUIR6Jh0+j2mLuETr1kK8wL8s4gAjFdSNV73wF8m+ppoaCctqYkk060WyTTliFMnWR+ENQYXxajHj/w=,mDyPPmq2Hu5AIrS+eq3JgORpXv8JdxruLjGt/EY0X34=,l2JnZKQehdnvYx/4TWtjfGt+c2iUrGuu19gZT5Syx34=,/Qal56foA1I6RCuTadOHJ1UAuuRNMRSzVON8KlzHh7s=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
