FROM node:12-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["node", "src/server.js"]
