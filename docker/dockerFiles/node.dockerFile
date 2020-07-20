FROM node:14

WORKDIR /usr/src/app

COPY ./dist/api/package.json ./
COPY ./dist/api/yarn.lock ./
RUN yarn install --production

COPY ./dist/api .

EXPOSE 3000
CMD ['yarn', 'start:prod']
