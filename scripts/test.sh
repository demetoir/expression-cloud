set -e
# goto root directory

cd ./api
yarn docker:test-storage:up

yarn test:cov

yarn docker:test-storage:down
cd ..


cd ./app
yarn test
cd ..
