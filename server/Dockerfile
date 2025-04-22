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

# משתני סביבה בשביל puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_DOWNLOAD=true

# תיקיית עבודה
WORKDIR /server

# התקנת תלויות
COPY package*.json ./
RUN npm install

# העתקת קבצי פרויקט
COPY . .

# הרצת האפליקציה
CMD ["node", "index.js"]
