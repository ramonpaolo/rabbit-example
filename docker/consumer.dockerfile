FROM node:14.17-alpine AS appbuild

WORKDIR /app

COPY ./services/consumer ./

RUN yarn build

# ---------

FROM node:14.17-alpine

WORKDIR /app

EXPOSE 3000

COPY --from=appbuild /app/dist ./dist
COPY --from=appbuild /app/package.json /app/yarn.lock /app/.env ./

RUN touch ./dist/settings/text.txt

RUN yarn install --production

RUN chown -R node ./dist

USER node

CMD ["yarn", "start"]