FROM node:14.17-alpine AS appbuild

WORKDIR /app

COPY ./services/sender ./

RUN yarn build

# ---------

FROM node:14.17-alpine

WORKDIR /app

EXPOSE 3000

COPY --from=appbuild /app/dist ./dist
COPY --from=appbuild /app/package.json /app/yarn.lock /app/.env ./

RUN yarn install --production

USER node

CMD ["yarn", "start"]