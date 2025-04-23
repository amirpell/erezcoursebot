const QRCode = require('qrcode-terminal');

const text = '2@H/bOzmi3v1PmZ4oufalsqXopsdbFfBHl5h2Lb3r0jEyj+HlsVxHt88inYDL3zfXcVdnmS1Za4w2D4iOaK0aLqskENygp9ZtyOWw=,QoTUslw8kuT5ilnlEv3XImtw0WTfVgEVkKR4jghomgA=,lj3Pzw9r5RKebkFGzamxz7rtgPFXt7R7Ddm6ffnt7X4=,6EZn3KlKgwUXgThirRp81AsvLHr+sfXUI7qFoJdX8XE=,1';

QRCode.generate(text, { small: true }, function (qrcode) {
    console.log(qrcode);
});
