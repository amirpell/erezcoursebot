# תדמית עם Node.js ו-Chrome מובנה
FROM zenika/alpine-chrome:with-node

# משתני סביבה בשביל puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    PUPPETEER_SKIP_DOWNLOAD=true

# תיקיית עבודה
WORKDIR /app

# התקנת תלויות
COPY package*.json ./
RUN npm install

# העתקת קבצי פרויקט
COPY . .

# חשיפת פורט
EXPOSE 10000

# הרצת האפליקציה
CMD ["node", "index.js"]
