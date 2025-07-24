# Use official Node.js image as base
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of application code
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "dev"]
#CMD ["yarn", "build", "&&", "yarn", "start"]
