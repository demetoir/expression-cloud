# exit on any error raised
set -e

echo 'start docker containers'
docker-compose -f ./docker/dev-storage.compose.yml --env-file ./env/.env.dev up -d
