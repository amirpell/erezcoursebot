const QRCode = require('qrcode-terminal');

const text = '2@lsel6LWdREeESYtl2ybjmrktQbHiz1GCDN8FXtQ9NkcvSnb2pCbPBWbK2cndpY6KKihmz0M5nxH5ePdi4ZtXiev2PBEq9v2TqcA=,9BhICU2CMPK/UJhEaJY99k5sAUsztkQ4Hz4gCeOW9jM=,j3H5pLuFjRTBvKdUJO+FlMaOQRv3nnG6SRFPjzizPC4=,36KdX8C+pkrEdjc/4LAOdRtbBSuagRxuKENlhgwVXJY=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
