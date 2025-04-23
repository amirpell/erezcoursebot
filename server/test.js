const QRCode = require('qrcode-terminal');

const text = '2@T6rlUc8Cu9hTeoUjilOOGy9Y1jorZBnlTFR3IWih4fSTuTjlJTUKtQSpOyKcTPe6vdlBcHRfsIq3WEmLdP8rrf0Y1UG0/eIv33E=,hc2meEDVXBgv1rBY/5LpPWj+4nFBBLAv3I5SvX4yfHA=,DsrZSdWHEodLaT59Bg3TE7g1+Q9NZmM+BDlCopib8T0=,zb44HUlmHFfMhl8X73VwWlEa2u3VjV1e7zqvJ1VM2Ho=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
