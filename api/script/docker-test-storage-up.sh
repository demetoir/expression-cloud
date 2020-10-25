# exit on any error raised
set -e

echo 'start docker containers'
docker-compose -f ./docker/test-storage.compose.yml --env-file ./env/.env.test up -d
