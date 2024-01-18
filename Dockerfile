# Use an official Node.js runtime as a base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Add wait-for-it script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Copy .env file to the working directory
# COPY .env ./

RUN npx prisma generate

# Build the application (adjust the command based on your actual build script)
RUN npm run build

# Specify the command to run your application only after PostgreSQL is ready
CMD [ "sh", "-c", "/usr/wait-for-it.sh my_postgres:5432 -- npx prisma db push --force-reset && npm run start:dev" ]