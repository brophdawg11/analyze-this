FROM node:10
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD sleep 3 && node src/subscriber-$SUBSCRIBER.js
