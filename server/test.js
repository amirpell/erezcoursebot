const QRCode = require('qrcode-terminal');

const text = '2@HlgRcA2Y4m29RFokW3fKkujHa6WHOj27rjwMlhoBcB+CG4TPidjYZKdp7hAyxZ/FMDbCveGC0lT4kTRfr8uzUOSs26gzuBi3abE=,/MUbTl/bZnIMvrtRYhmIDiRdWdZKE7zke9hJQRtvXA4=,e9s7WXiGM0tWuShPsvXDJ4afjK6JdLuCrpIBLtIXmCw=,5K9IqKOgFsrF/zzMLdqRlssezyiZpYcsyonsC1t1zE0=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
