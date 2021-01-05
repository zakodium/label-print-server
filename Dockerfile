FROM node:14-alpine

ENV NODE_ENV production
ENV NODE_PORT 3000
ENV LOG_LEVEL info

EXPOSE 3000

WORKDIR /app

RUN npm install -g npm@7
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["node", "src/server.js"]
