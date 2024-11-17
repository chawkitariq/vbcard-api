FROM node:23 AS builder

USER node:node

WORKDIR /home/node/app

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./yarn.lock .

RUN yarn install

COPY --chown=node:node . .

ARG NODE_ENV="production"

RUN yarn build

FROM node:23

ENV NODE_ENV="production"

USER node:node

WORKDIR /home/node/app

COPY --chown=node:node --from=builder /home/node/app/package.json package.json
COPY --chown=node:node --from=builder /home/node/app/yarn.lock yarn.lock
COPY --chown=node:node --from=builder /home/node/app/dist dist

EXPOSE 3000

CMD [ "yarn", "start:prod" ]