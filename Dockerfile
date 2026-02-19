# 1. Tell the server to use Node version 20
FROM node:20-slim

# 2. Create a folder inside the server for your app
WORKDIR /usr/src/app

# 3. Copy your package files first (helps with speed)
COPY package*.json ./

# 4. Install your dependencies (express, mysql2, etc.)
RUN npm install --production

# 5. Copy the rest of your code
COPY . .

# 6. Back4App uses port 8080 by default
EXPOSE 8080

# 7. Start your application
CMD [ "node", "index.js" ]