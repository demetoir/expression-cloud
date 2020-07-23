# reference https://medium.com/trendyol-tech/how-we-reduce-node-docker-image-size-in-3-steps-ff2762b51d5a
FROM node:12-alpine AS BUILD_IMAGE


# couchbase sdk requirements
RUN apk update && apk add yarn curl bash python g++ make && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

COPY ./api/package.json  .
COPY ./api/yarn.lock .

RUN yarn install --frozen-lockfile

COPY ./api .

# test
#RUN yarn test

# build
RUN yarn build

# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

FROM node:12-alpine

WORKDIR /usr/src/app

RUN npm install pm2 -g

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY ./api/package.json  .
COPY ./api/yarn.lock .
COPY ./api/ecosystem.config.js .
COPY ./api/ormconfig.js .

EXPOSE 3000

CMD pm2-runtime ecosystem.config.js
