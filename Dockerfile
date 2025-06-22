FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (untuk cache install)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Build Next.js
RUN npm run build

# Port exposed by app
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Start app
CMD ["npm", "start"]
