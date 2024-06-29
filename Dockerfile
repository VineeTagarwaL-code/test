# Start with Node.js base image
FROM node:21

# Create and set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Comment out the problematic lines in download.js
RUN sed -i 's/process.stdout.clearLine(0);/\/\/ process.stdout.clearLine(0);/' /app/node_modules/node-tls-client/dist/utils/download.js
RUN sed -i 's/process.stdout.cursorTo(0);/\/\/ process.stdout.cursorTo(0);/' /app/node_modules/node-tls-client/dist/utils/download.js

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
