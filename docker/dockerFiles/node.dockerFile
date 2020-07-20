FROM node:14

WORKDIR /usr/src/app
EXPOSE 3000

COPY ./api/package.json .
COPY ./api/yarn.lock .
RUN yarn install --production

COPY ./api .

CMD ['yarn', 'start:prod']
