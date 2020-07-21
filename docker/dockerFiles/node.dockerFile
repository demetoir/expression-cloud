FROM node:14

WORKDIR /usr/src/app

EXPOSE 3000

COPY ./api/package.json .
COPY ./api/yarn.lock .

RUN yarn install --production

COPY ./api/ecosystem.config.js .
COPY ./api/ormconfig.js .
COPY ./api/dist ./dist

CMD 'yarn' 'pm2-runtime' './ecosystem.config.js'
