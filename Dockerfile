# Use Node.js 20 (LTS)
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Define build argument (used at build time)
ARG DATABASE_URL

# Set environment variable (available at runtime)
ENV DATABASE_URL=${DATABASE_URL}

# Copy package.json and package-lock.json first (for caching)
COPY package.json package-lock.json ./

# Install dependencies with --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy Prisma schema
COPY prisma ./prisma

# ✅ Run Prisma generate before build (uses DATABASE_URL)
RUN npx prisma generate

# Copy the rest of the app files
COPY . .

# ✅ Ensure Prisma schema is included
RUN ls -la ./prisma

# Build the Next.js app
RUN npm run build

# Expose port 3000 for Next.js
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
