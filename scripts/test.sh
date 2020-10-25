set -e
# goto root directory

docker-compose -v
cd ./api
yarn docker:test-storage:up

echo 'wait 20s for mysql docker container'
sleep 20

yarn test
yarn docker:test-storage:down
cd ..


cd ./app
yarn test
cd ..
