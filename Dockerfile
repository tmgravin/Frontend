# Stage 1: Build the Next.js application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules

# Install dependencies for the runtime environment
RUN npm install --only=production

# Expose port 4000
EXPOSE 4000

# Start the Next.js application
CMD ["npm", "start"]
