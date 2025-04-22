# Use the official puppeteer image to avoid downloading chromium manually
FROM ghcr.io/puppeteer/puppeteer:24.6.1

# Skip chromium download and set the path for the installed chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Run the application
CMD ["node", "index.js"]
