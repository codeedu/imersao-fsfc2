FROM node:14.15.4-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

COPY --chown=node ./ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]