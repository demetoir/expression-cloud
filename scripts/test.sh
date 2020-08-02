set -e
# goto root directory

cd ./api
yarn test
yarn test:e2e
yarn test:cov
cd ..


cd ./app
yarn test
cd ..
