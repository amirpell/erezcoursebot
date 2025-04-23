const QRCode = require('qrcode-terminal');

const text = '2@RaY7jKEqr2bc/SGHzKO8uLOI5YQZ/ZUFZuLUUPdMEcjOHT62D8X7xta05qxLWFcHlLSlLR1v6bZjAVHWV+JZvFLAiHmhxU5MGd8=,6DEXBAB34hLv3b7PYQniFwB63GooU+Al662Om62DBA0=,xY+x7sRF/IWQ8BpuMrzMtAHL3gNRcpp7d0OR9XkmMCw=,2oWHO4kxo3VBiiDzg/wJVOA4ehOTi22cabdhxYeIlxg=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
