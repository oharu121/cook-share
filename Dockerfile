# Use Node.js 20 (LTS)
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package.json package-lock.json ./

# Install dependencies with --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy the rest of the app files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 for Next.js
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
