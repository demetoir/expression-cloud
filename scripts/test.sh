pwd

# goto root directory

cd ./api
yarn test
yarn test:e2e
cd ..


cd ./app
yarn test:unit
yarn test:e2e

cd ..
