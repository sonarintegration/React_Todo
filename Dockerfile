FROM node:14-alpine

# Set the working directory
WORKDIR /app
#
# # Copy package.json and package-lock.json (if present)
COPY package*.json ./
#
# # Install dependencies
RUN npm install
#
# # Copy the rest of the application code
COPY . .
#
# # Build the application
RUN npm run build
#
# # Install serve globally
RUN npm install -g serve
#
# # Expose the port the app runs on
EXPOSE 3002
#
# # Set the command to run the application
CMD ["serve", "-s", "build", "-l", "3002"]
#
