FROM node:18.16.0-alpine3.17

WORKDIR /home/node/front

COPY ./front /home/node/front
RUN yarn
RUN yarn build

EXPOSE 3000

CMD ["node", "server.js"]