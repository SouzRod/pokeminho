# Use the specific Node.js v24.3.0 Alpine image as the base
FROM node:24.3.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's caching
# This means npm install won't re-run unless dependencies change
COPY package*.json ./

# Install application dependencies, skipping development dependencies for production
RUN npm install --omit=dev

# Copy the rest of your NestJS application code into the container
COPY . .

# Build the NestJS application. This command assumes you have a "build" script
# in your package.json that compiles your TypeScript code (e.g., to a 'dist' folder).
RUN npm run build

# Expose the port your NestJS application listens on (default for NestJS is 3000)
EXPOSE 3000

# Define the command to run your NestJS application in production mode
# This typically points to the compiled JavaScript file in the 'dist' directory.
CMD [ "node", "dist/main" ]