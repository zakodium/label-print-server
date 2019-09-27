FROM node:12-alpine

ENV NODE_ENV production
ENV NODE_PORT 3000
ENV LOG_LEVEL info

EXPOSE 3000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["node", "src/server.js"]
