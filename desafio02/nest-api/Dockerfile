FROM node:14.15.4-alpine3.12

RUN apk add bash

RUN npm install -g @nestjs/cli

# USER node

WORKDIR /home/node/app

COPY . .