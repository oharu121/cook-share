# Use Node.js 20 (LTS)
FROM node:20

# Enable corepack for pnpm support
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# Set the working directory in the container
WORKDIR /app

# Define build argument (used at build time)
ARG DATABASE_URL

# Set environment variable (available at runtime)
ENV DATABASE_URL=${DATABASE_URL}

# Copy package.json and pnpm-lock.yaml first (for caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy Prisma schema
COPY prisma ./prisma

# Run Prisma generate before build (uses DATABASE_URL)
RUN pnpm exec prisma generate

# Copy the rest of the app files
COPY . .

# Ensure Prisma schema is included
RUN ls -la ./prisma

# Build the Next.js app
RUN pnpm run build

# Expose port 3000 for Next.js
EXPOSE 3000

# Start the Next.js app
CMD ["pnpm", "run", "start"]
