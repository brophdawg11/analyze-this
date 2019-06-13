FROM node:10
COPY . .
WORKDIR src/dashboard
RUN npm ci
RUN npm run build
CMD node src/server.js
