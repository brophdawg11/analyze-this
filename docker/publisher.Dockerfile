FROM node:10
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD sleep 5 && node src/publisher.js
