FROM node:23-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY ./src .

# Copy the .env.production file
COPY .env.production .env

RUN ls -la /usr/src/app

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]