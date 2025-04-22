FROM zenika/alpine-chrome:with-node

# מתקין כרום ודפדפנים דרושים
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    chromium \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# משתני סביבה בשביל puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    PUPPETEER_SKIP_DOWNLOAD=true

# תיקיית עבודה, במקרה שלנו בתיקיית server
WORKDIR /server

# התקנת תלויות
COPY package*.json ./  
RUN npm install

# העתקת קבצי פרויקט
COPY . .

# הרצת האפליקציה
CMD ["node", "index.js"]
