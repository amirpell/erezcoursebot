# השתמש בתמונה בסיסית של Alpine
FROM alpine:latest

# התקנת חבילות דרושות
RUN apk update && apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    libx11 \
    xdg-utils \
    bash \
    nodejs \
    npm

# משתני סביבה בשביל Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_DOWNLOAD=true

# תיקיית עבודה (עובדים בתיקיית /server)
WORKDIR /server

# העתקת קבצי package.json ו- package-lock.json (אם קיים)
COPY package*.json ./

# התקנת התלויות
RUN npm install

# העתקת שאר קבצי הפרויקט לתוך הקונטיינר
COPY . .

# הרצת האפליקציה
CMD ["node", "index.js"]
