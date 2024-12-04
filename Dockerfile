FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g ts-node-dev

EXPOSE 3000

CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/main.ts"]
