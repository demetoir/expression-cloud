set -e
# goto root directory

cd ./api
yarn docker:test-storage:up

echo 'wait 20s for mysql docker container'
sleep 20

yarn test:cov
yarn docker:test-storage:down
cd ..


cd ./app
yarn test
cd ..
